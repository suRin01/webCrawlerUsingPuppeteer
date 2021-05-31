const utils = require("./utils")
async function postContentsParser(page, selectorData) {
  if(page == undefined){
    return {};
  }

    await page.click("a.btn_comment ")
    .catch(()=>{})

    await page
      .waitForSelector(selectorData.comment, { timeout: 5000 })
      .catch(() => {
        console.log("No comments")
      })


  let data = await page.evaluate((selectorData) => {
    //strip unnecessary elements
    for (let idx = 0, len = selectorData["unnecessaryElements"].length; idx < len; idx++) {
      let stripTarget = document.querySelector(selectorData["unnecessaryElements"][idx])
      if (stripTarget != null) {
        stripTarget.parentNode.removeChild(stripTarget);
      }
    }
    let actualPostData = {};

    let title = document.querySelector(selectorData.title)
    if (title != undefined) {
      actualPostData["title"] = title.innerText
    }

    let articleUploadDate = document.querySelector(selectorData.articleUploadDate)
    if (articleUploadDate != undefined) {
      actualPostData["articleUploadDate"] = articleUploadDate.innerText
    }

    let articleAuthor = document.querySelector(selectorData.articleAuthor)
    if (articleAuthor != undefined) {
      actualPostData["articleAuthor"] = articleAuthor.innerText
    }

    let mainText = document.querySelector(selectorData.mainText)
    if (mainText != undefined) {
      actualPostData["mainText"] = mainText.innerText
    }

    let comments = document.querySelectorAll(selectorData.comment);
    actualPostData["comments"] = [];
    for (let idx = 0, len = comments.length; idx < len; idx++) {
      console.log("    " + comments[idx].innerText)
      actualPostData["comments"][idx] = comments[idx].innerText;
    }


    return actualPostData;
  }, selectorData)
  .catch(e=>{
    console.log(e)
  })
  data["articleUploadDate"] = utils.dateNormalization(data["articleUploadDate"]);

  await page.waitFor(3000);
  return data;

}

async function getUrlsOnSearchPage(onPage, elementSelector, postSource) {
  if(onPage == undefined){
    return [];
  }

  return await onPage.evaluate((elementSelector, postSource) => {
    let scrappedData = [];
    // const detailAreas = document.querySelectorAll("a.item_subject")
    const detailAreas = document.querySelectorAll(elementSelector)

    for (let idx = 0, len = detailAreas.length; idx < len; idx++) {
      scrappedData.push({ source: postSource, herf: detailAreas[idx].href })
    }
    return scrappedData;
  }, elementSelector, postSource)
  .catch(e=>{
    return []
  })
}


module.exports.getUrlsOnSearchPage = getUrlsOnSearchPage;
module.exports.postContentsParser = postContentsParser;

// this 함수에서 this가 다르다
// const test = function(){};
// const arrow = () => {};
// = / == / === 차이점 ===으로 바꾸기.


// 어떤 경로든 url 접근 -> selectr inject -> 원하는 값 크롤링. => UTIL FUNCTION


// CLOUD = 100
// aws 아마존 웹 서비스 / gcp 구글 클라우드 페어 
// aws ec2 * 200 - 크롤러 배포.-> 서버  가상머신  
// VPN= 냬 IP를 조작하겠다.