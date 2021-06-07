let puppeteer = require("puppeteer")
let dateFormatParse = require("date-format-parse")
let dateTime = require("../util/dateTime")

let endDate = new Date()
let targetDate = new Date()
let strings = require("../common/constant").strings
let selector

let browser;

function setDuration(_startDate, _endDate) {
  targetDate = _startDate
  endDate = _endDate
}
function setTarget(_target) {
  selector = require("../common/constant")[_target]

}

async function start(debugMode = false) {
  browser = await puppeteer.launch(Option = { headless: !debugMode, devtools: debugMode, defaultViewport: null });

  console.log("Start Crawling")

  while (targetDate > endDate) {
    console.log("Step 1")
    let targetUrlList = await getUrlList()
    console.log(targetUrlList)
    targetUrlList.forEach(async (targetUrl) => {
      let crawledData = await getHtmlData(targetUrl);
      let refinedData = dataNormalize(crawledData);
      putDataToDB(refinedData);
    });
    targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1));
  }

}
async function getUrlList() {
  console.log("get url list on target site")
  const page = await browser.newPage();
  let pageNum = 1;
  let previousPageItemCount = -1;
  let currentPageItemCount = -1;
  // pipe page's console data to terminal
  page.on('console', consoleObj => console.log(consoleObj.text()));
  while ((previousPageItemCount === currentPageItemCount) || (previousPageItemCount === -1)) {
    previousPageItemCount = currentPageItemCount;

    let targetDateSearchPage = selector.searchPageBaseURL + pageNum
      + selector.searchPageTargetDateStart + dateTime.format(targetDate, selector.searchDateFormatStart)
      + selector.searchPageTargetDateEnd + dateTime.format(targetDate, selector.searchDateFormatEnd)
    console.log(`go to ${targetDateSearchPage}`)
    await page.goto(targetDateSearchPage, { waitUntil: 'networkidle0' })
      .catch(e => {
        console.log(e);
      })

    let data = await getHtmlData(page, {title: selector["searchPagePostURLSelector"]}, "href")
    // let data = await page.$$(selector["searchPagePostURLSelector"])
    // console.log(await data[0].getProperty('innerText'))
    currentPageItemCount = data.length

    // get actual data from post with scraped urls
    for (let idx = 0; idx < currentPageItemCount; idx++) {
      console.log(`go to ${data[idx]["herf"]}`)
      await page.goto(data[idx]["herf"], { waitUntil: 'networkidle0' })
      let frame;
      if (selector["innerIframeId"] !== "") {
        frame = page.frames().find(frame => frame.name() === selector["innerIframeId"])
      }
      else {
        frame = page;
      }
      const returnedActualPostData = await getHtmlData(page, {title: selector["searchPagePostURLSelector"]}, "innerText")
      data[idx]["postData"] = {};
      data[idx]["postData"] = returnedActualPostData;
      // console.log(data[idx]["postData"]) 
    }
    // require("../util/db").put(data)
    pageNum += 1;
  }
  return;
}


async function getHtmlData(page, selectorData, type) {
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

  let data = await page.evaluate((selectorData, type) => {
    // remove unwanted elements
    if (selectorData.unnecessarySelector !== undefined) {
      for (const key in removeData) {
        if (Object.hasOwnProperty.call(removeData, key)) {
          const element = removeData[key];
          let stripTarget = document.querySelector(element)
          if (stripTarget != null) {
            stripTarget.parentNode.removeChild(stripTarget);
          }
        }
      }
    }

    let actualPostData = {};
    for (const key in selectorData) {
      if (Object.hasOwnProperty.call(selectorData, key)) {
        const element = selectorData[key];
        // console.log(element)
        let data = document.querySelectorAll(element);
        data.forEach(ele => {
          console.log(ele[type])
        });

        if (data !== undefined) {
          actualPostData[key] = data
        }
      }
    }

    return actualPostData;
  }, selectorData, type)
    .catch(e => {
      console.log(e)
    })
  console.log(data)
  if(data !== undefined || data.articleUploadDate !== undefined){
    data.articleUploadDate = dateTime.dateNormalization(data.articleUploadDate);
  }
  
  await page.waitFor(3000);
  return data;
}

function putDataToDB() {
}


module.exports.setDuration = setDuration
module.exports.setTarget = setTarget
module.exports.start = start

