let puppeteer = require("puppeteer");
let dateFormatParse = require("date-format-parse");
let dateTime = require("../util/dateTime");
let db = require("../util/db");

let endDate = new Date();
let targetDate = new Date();
let strings = require("../common/constant").strings;
let selector;

let browser;

function setDuration(_startDate, _endDate) {
  targetDate = _startDate;
  endDate = _endDate;
}

function setTarget(_target) {
  selector = require("../common/constant")[_target];

}

async function start(debugMode = false) {
  browser = await puppeteer.launch(Option = { headless: !debugMode, devtools: debugMode, defaultViewport: null });

  console.log("Start Crawling");
  const page = await browser.newPage();

  let previousTargetUrlList = [];
  while (targetDate > endDate) {
    let pageNum = 1;
    while(true){
      let searchPageUrl = selector.searchPageBaseURL + pageNum  
                + selector.searchPageTargetDateStart + dateFormatParse.format(targetDate, selector.searchDateFormatStart)
                + selector.searchPageTargetDateEnd + dateFormatParse.format(targetDate, selector.searchDateFormatEnd)

      console.log("move to "+searchPageUrl);
      let result = await page.goto(searchPageUrl, { waitUntil: strings.waitUntil })
      .then(()=>{
        return 0;
      })
      .catch(e => {
        console.log(e);
        return undefined;
      })
      if(result === undefined){
        console.log("Page is not responding currently")
        continue;
      }
    let targetUrlList = [];
    targetUrlList = await querySelectedAllData(page, selector.searchPagePostURLSelector, strings.elementInnerContentType.link);
    // console.log(targetUrlList);

    //이전 페이지 검색 결과와 같은게 있음-> 마지막 페이지 이상의 데이터 긁을때
    let unmergedUrlListCount = previousTargetUrlList.length + targetUrlList.length;
    Array.prototype.push.apply(previousTargetUrlList, targetUrlList)
    if((new Set(previousTargetUrlList)).size !== unmergedUrlListCount){
      console.log("마지막 페이지 였습니다.")
      break;
    }


    let crawledDataArray = [];

    for (let idx = 0, len = targetUrlList.length; idx < len; idx++) {
      console.log("move to "+targetUrlList[idx]);
      let result = await page.goto(targetUrlList[idx], { waitUntil: strings.waitUntil })
      .then(()=>{
        return 0;
      })
      .catch(e => {
        console.log(e);
        return undefined;
      })
      if(result === undefined){
        console.log("Page is not responding currently")
        continue;
      }
      let frame;
      if(selector.innerIframeId !== ""){
        console.log("Find innerFrame, name: "+selector.innerIframeId);
        frame = page.frames().find(frame => frame.name() === selector.innerIframeId);
      }else{
        frame = page;
      }
      let title = await querySelectedData(frame, selector.postSelectorData.title, strings.elementInnerContentType.text);
      let articleUploadDate = dateTime.dateNormalization(await querySelectedData(frame, selector.postSelectorData.articleUploadDate, strings.elementInnerContentType.text));
      let articleAuthor = await querySelectedData(frame, selector.postSelectorData.articleAuthor, strings.elementInnerContentType.text);
      let mainText = await querySelectedData(frame, selector.postSelectorData.mainText, strings.elementInnerContentType.text, selector.postSelectorData.unnecessaryElements);
      let comment = await querySelectedAllData(frame, selector.postSelectorData.comment, strings.elementInnerContentType.text);

      crawledDataArray.push(dbDataConstructor(selector.source, targetUrlList[idx], title, articleUploadDate, articleAuthor, mainText, comment));
    }

    db.put(crawledDataArray);
    previousTargetUrlList = targetUrlList;
    pageNum += 1;

    }
    targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1));
    
  }
}


// 구현 완료

function dbDataConstructor(source, href, title, articleUploadDate, articleAuthor, mainText, comment){
  let data = {
    source: source,
    herf: href,
    postData: {
      title: title,
      articleUploadDate: articleUploadDate,
      articleAuthor: articleAuthor,
      mainText: mainText,
      comments: comment
    }
  }

  return data;
}


async function querySelectedData(page, selector, type, unnecessarySelector=undefined){
  let data = await page.evaluate((selector, type, unnecessarySelector) => {
    // remove unwanted elements
    if (unnecessarySelector !== undefined) {
      for (const key in unnecessarySelector) {
        if (Object.hasOwnProperty.call(unnecessarySelector, key)) {
          const element = unnecessarySelector[key];
          let stripTarget = document.querySelector(element);
          if (stripTarget != null) {
            stripTarget.parentNode.removeChild(stripTarget);
          }
        }
      }
    }
    console.log(document.querySelector(selector)[type]);

    return document.querySelector(selector)[type];
  }, selector, type, unnecessarySelector)
  .catch((e)=> {
    console.log(e);
    console.log("해당 게시물에 "+selector+"로 검색된 데이터가 존재하지 않습니다");
  })  

  return data
}

async function querySelectedAllData(page, selector, type, unnecessarySelector=undefined){
  let data = await page.evaluate((selector, type, unnecessarySelector) => {
    // remove unwanted elements
    if (unnecessarySelector !== undefined) {
      for (const key in removeData) {
        if (Object.hasOwnProperty.call(removeData, key)) {
          const element = removeData[key];
          let stripTarget = document.querySelector(element);
          if (stripTarget != null) {
            stripTarget.parentNode.removeChild(stripTarget);
          }
        }
      }
    }

    let data = document.querySelectorAll(selector);
    let returnData = [];
    for(idx = 0, len = data.length; idx< len; idx++){
      returnData[idx] = data[idx][type];
    }
    return returnData;
  }, selector, type, unnecessarySelector)
  .catch(e => {
    console.log(e);
  })  

  return data;
}



module.exports.setDuration = setDuration;
module.exports.setTarget = setTarget;
module.exports.start = start;

