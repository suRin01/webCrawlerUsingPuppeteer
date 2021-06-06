
class crawler {
  endDate = new Date()
  startDate = new Date()
  debugMode = false
  strings = require("../common/constant").strings
  constructor(target, debugMode) {
    this.target = target
    this.config = require("../common/constant")[this.target]
    this.puppeteer = require('puppeteer');
    this.browser = this.puppeteer.launch({ headless: !debugMode, devtools: debugMode, defaultViewport: null });

  }

  test(){
    console.log("hi")
  }

  setDuration(startDate, endDate) {
    this.startDate = startDate
    this.endDate = endDate
  }

  async start() {
    while (this.startDate > this.endDate) {
      let targetUrlList = await this.getUrlList()
      targetUrlList.forEach(async (targetUrl) => {
        let crawledData = await this.getHtmlData(targetUrl);
        let refinedData = dataNormalize(crawledData);
        putDataToDB(refinedData);
      });
      this.startDate = new Date(startDate.setDate(startDate.getDate() - 1));
    }

  }

  async getUrlList() {
    const page = await this.browser.newPage();
    let pageNum = 1;
    let previousPageItemCount = -1;
    let currentPageItemCount = -1;

    // pipe page's console data to terminal
    // page.on('console', consoleObj => console.log(consoleObj.text()));

    while ((previousPageItemCount === currentPageItemCount) || (previousPageItemCount === -1)) {
      previousPageItemCount = currentPageItemCount;
      let targetDateSearchPage = JSONconfig["searchPageBaseURL"] + pageNum
        + JSONconfig["searchPageTargetDateStart"] + dateFormatParse.format(targetDate, JSONconfig["searchDateFormatStart"])
        + JSONconfig["searchPageTargetDateEnd"] + dateFormatParse.format(targetDate, JSONconfig["searchDateFormatEnd"])
      console.log(`go to ${targetDateSearchPage}`)

      await page.goto(targetDateSearchPage, { waitUntil: 'networkidle0' })
        .catch(e => {
          console.log(e);
        })
      let data = await htmlHandler.getUrlsOnSearchPage(page, JSONconfig["searchPagePostURLSelector"], JSONconfig["source"])
      currentPageItemCount = data.length

      // get actual data from post with scraped urls
      for (let idx = 0; idx < currentPageItemCount; idx++) {
        console.log(`go to ${data[idx]["herf"]}`)
        await page.goto(data[idx]["herf"], { waitUntil: 'networkidle0' })
        let frame;
        if (JSONconfig["innerIframeId"] !== "") {
          frame = page.frames().find(frame => frame.name() === JSONconfig["innerIframeId"])
        }
        else {
          frame = page;
        }

        const returnedActualPostData = await htmlHandler.postContentsParser(frame, JSONconfig["postSelectorData"])

        data[idx]["postData"] = {};
        data[idx]["postData"] = returnedActualPostData;
        // console.log(data[idx]["postData"])


      }
      // require("../util/db").put(data)

      pageNum += 1;
    }
    return;
  }

  async getHtmlData(page, selectorData) {
    if (page == undefined) {
      return {};
    }
    await page.click("a.btn_comment ")
      .catch(() => { })

    await page
      .waitForSelector(selectorData.comment, { timeout: 5000 })
      .catch(() => {
        console.log("No comments")
      })


    let data = await page.evaluate((selectorData, removeData) => {
      for (const key in selectorData) {
        if (Object.hasOwnProperty.call(selectorData, key)) {
          const element = selectorData[key];
          let stripTarget = document.querySelector(element)
          if (stripTarget != null) {
            stripTarget.parentNode.removeChild(stripTarget);
          }
        }
      }
      let actualPostData = {};
      for (const key in removeData) {
        if (Object.hasOwnProperty.call(removeData, key)) {
          const element = removeData[key];
          console.log(element)
          let data = document.querySelectorAll(element);
          if(data !== undefined){
            actualPostData[key] = data
          }
        }
      }



      // //strip unnecessary elements
      // for (let idx = 0, len = selectorData["unnecessaryElements"].length; idx < len; idx++) {
      //   let stripTarget = document.querySelector(selectorData["unnecessaryElements"][idx])
      //   if (stripTarget != null) {
      //     stripTarget.parentNode.removeChild(stripTarget);
      //   }
      // }
      // let actualPostData = {};

      // let title = document.querySelector(selectorData.title)
      // if (title != undefined) {
      //   actualPostData["title"] = title.innerText
      // }

      // let articleUploadDate = document.querySelector(selectorData.articleUploadDate)
      // if (articleUploadDate != undefined) {
      //   actualPostData["articleUploadDate"] = articleUploadDate.innerText
      // }

      // let articleAuthor = document.querySelector(selectorData.articleAuthor)
      // if (articleAuthor != undefined) {
      //   actualPostData["articleAuthor"] = articleAuthor.innerText
      // }

      // let mainText = document.querySelector(selectorData.mainText)
      // if (mainText != undefined) {
      //   actualPostData["mainText"] = mainText.innerText
      // }

      // let comments = document.querySelectorAll(selectorData.comment);
      // actualPostData["comments"] = [];
      // for (let idx = 0, len = comments.length; idx < len; idx++) {
      //   console.log("    " + comments[idx].innerText)
      //   actualPostData["comments"][idx] = comments[idx].innerText;
      // }


      return actualPostData;
    }, selectorData)
      .catch(e => {
        console.log(e)
      })
    data["articleUploadDate"] = utils.dateNormalization(data["articleUploadDate"]);

    await page.waitFor(3000);
    return data;
  }

  dataNormalize() {

  }

  putDataToDB() {

  }


}


module.exports = crawler;