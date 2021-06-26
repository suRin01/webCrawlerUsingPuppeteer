const puppeteer = require("puppeteer");
const crawler = require("../util/crawler");
const constants = require("../common/constant");
const dateTime = require("../util/dateTime");
const db = require("../util/db");

let target;
let browser;
let endDate = new Date();
let targetDate = new Date();

async function init(_target, _startDate, _endDate, debugMode=false){
    browser = await puppeteer.launch({ headless: !debugMode, devtools: debugMode, defaultViewport: null });
    target = _target;
    targetDate = _startDate;
    endDate = _endDate;
}

async function start() {
    let page = await browser.newPage();
    let previousTargetUrlList = [];
    while (targetDate > endDate) {
        let pageNum = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const searchPageUrl = constants[target].searchPageBaseURL + pageNum
                + constants[target].searchPageTargetDateStart + dateTime.format(targetDate, constants[target].searchDateFormatStart)
                + constants[target].searchPageTargetDateEnd + dateTime.format(targetDate, constants[target].searchDateFormatEnd);
            page = await goto(page,searchPageUrl);

            let targetUrlList = [];
            targetUrlList = await crawler.querySelectedAllData(page, constants[target].searchPagePostURLSelector, constants.strings.elementInnerContentType.link);

            // 이전 페이지 검색 결과와 같은게 있음-> 마지막 페이지 이상의 데이터 긁을때
            const unmergedUrlListCount = previousTargetUrlList.length + targetUrlList.length;
            Array.prototype.push.apply(previousTargetUrlList, targetUrlList);
            if ((new Set(previousTargetUrlList)).size !== unmergedUrlListCount) {
                console.log("마지막 페이지 였습니다.");
                break;
            }


            const crawledDataArray = [];
            for (let idx = 0, len = targetUrlList.length; idx < len; idx += 1) {
                page = await goto(page,targetUrlList[idx]);
                let tempPage = await paging(page, target);
                let parsedData = await parser(tempPage, target);
                crawledDataArray.push(db.dbDataConstructor(constants[target].source, targetUrlList[idx], parsedData.title, parsedData.articleUploadDate, parsedData.articleAuthor, parsedData.mainText, parsedData.comment));
            }
            db.put(crawledDataArray);
            previousTargetUrlList = targetUrlList;
            pageNum += 1;
        }
        targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1));
    }
}


async function goto(page, url){
    return await page.goto(url, { waitUntil: constants.strings.waitUntil })
        .then(()=>{
            console.log(`move to ${url}`);
            return page;
        })
        .catch((e) => {
            console.log(e);
            return undefined;
        });
}

async function paging(page, target){
    // go to innerFrame
    let targetFrame;
    if (constants[target].innerIframeId !== "") {
        console.log(`Find innerFrame, name: ${constants[target].innerIframeId}`);
        targetFrame = page.frames().find((frame) => frame.name() === constants[target].innerIframeId);
    } else {
        targetFrame = page;
    }
    // activate comment view
    try{
        await targetFrame.click("a.btn_comment"); 
        await targetFrame
            .waitForSelector(constants[target].postSelectorData.comment, {timeout: 3000})
            .catch(()=>{
                console.log("No comments");
            });
    
    }catch{(e) => {
        console.log(e);
    };
    }
    return targetFrame;
}

async function parser(page, target){
    const title = await crawler.querySelectedData(page, constants[target].postSelectorData.title, constants.strings.elementInnerContentType.text);
    const articleUploadDate = dateTime.normalization(await crawler.querySelectedData(page, constants[target].postSelectorData.articleUploadDate, constants.strings.elementInnerContentType.text));
    const articleAuthor = await crawler.querySelectedData(page, constants[target].postSelectorData.articleAuthor, constants.strings.elementInnerContentType.text);
    const mainText = await crawler.querySelectedData(page, constants[target].postSelectorData.mainText, constants.strings.elementInnerContentType.text, constants[target].postSelectorData.unnecessaryElements);
    const comment = await crawler.querySelectedAllData(page, constants[target].postSelectorData.comment, constants.strings.elementInnerContentType.text);

    return {title, articleUploadDate,articleAuthor, mainText, comment};
}

module.exports.init = init;
module.exports.start = start;