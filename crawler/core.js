const puppeteer = require("puppeter");
const crawler = require("../util/crawler");
const strings = require("../common/constant");
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
            const searchPageUrl = strings[target].searchPageBaseURL + pageNum
                + strings[target].searchPageTargetDateStart + dateTime.format(targetDate, strings[target].searchDateFormatStart)
                + strings[target].searchPageTargetDateEnd + dateTime.format(targetDate, strings[target].searchDateFormatEnd);

            console.log(`move to ${searchPageUrl}`);
            // eslint-disable-next-line no-await-in-loop
            const result = await page.goto(searchPageUrl, { waitUntil: strings.waitUntil })
                .then(() => 0)
                .catch((e) => {
                    console.log(e);
                    return undefined;
                });
            if (result === undefined) {
                console.log("Page is not responding currently");
                continue;
            }
            let targetUrlList = [];
            targetUrlList = await crawler.querySelectedAllData(page, strings[target].searchPagePostURLSelector, strings.elementInnerContentType.link);

            // 이전 페이지 검색 결과와 같은게 있음-> 마지막 페이지 이상의 데이터 긁을때
            const unmergedUrlListCount = previousTargetUrlList.length + targetUrlList.length;
            Array.prototype.push.apply(previousTargetUrlList, targetUrlList);
            if ((new Set(previousTargetUrlList)).size !== unmergedUrlListCount) {
                console.log("마지막 페이지 였습니다.");
                break;
            }

            const crawledDataArray = [];

            for (let idx = 0, len = targetUrlList.length; idx < len; idx += 1) {
                console.log(`move to ${targetUrlList[idx]}`);
                page = goto(page,targetUrlList[idx]);

                page = paging(page, target);
                                
                let parsedData = parser(page, target);
                
                crawledDataArray.push(db.dbDataConstructor(strings[target].source, targetUrlList[idx], parsedData.title, parsedData.articleUploadDate, parsedData.articleAuthor, parsedData.mainText, parsedData.comment));
                // crawledDataArray.push(db.dbDataConstructor(strings[target].source, targetUrlList[idx], parsedData.title, parsedData.articleUploadDate, parsedData.articleAuthor, parsedData.mainText, parsedData.comment));
                
            }

            // db.put(crawledDataArray);
            previousTargetUrlList = targetUrlList;
            pageNum += 1;
        }
        targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1));
    }
}










async function goto(page, url){
    return await page.goto(url, { waitUntil: strings.waitUntil })
        .then(() => 0)
        .catch((e) => {
            console.log(e);
            return undefined;
        });
}

async function paging(page, target){
    // go to innerFrame
    let targetFrame;
    if (strings[target].innerIframeId !== "") {
        console.log(`Find innerFrame, name: ${strings[target].innerIframeId}`);
        targetFrame = page.frames().find((frame) => frame.name() === strings[target].innerIframeId);
    } else {
        targetFrame = page;
    }
    // activate comment view
    try{
        await targetFrame.click("a.btn_comment"); 
        await targetFrame
            .waitForSelector(strings[target].postSelectorData.comment, {timeout: 3000})
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
    const title = await crawler.querySelectedData(page, strings[target].postSelectorData.title, strings.elementInnerContentType.text);
    const articleUploadDate = dateTime.normalization(await crawler.querySelectedData(page, strings[target].postSelectorData.articleUploadDate, strings.elementInnerContentType.text));
    const articleAuthor = await crawler.querySelectedData(page, strings[target].postSelectorData.articleAuthor, strings.elementInnerContentType.text);
    const mainText = await crawler.querySelectedData(page, strings[target].postSelectorData.mainText, strings.elementInnerContentType.text, strings[target].postSelectorData.unnecessaryElements);
    const comment = await crawler.querySelectedAllData(page, strings[target].postSelectorData.comment, strings.elementInnerContentType.text);

    return {title, articleUploadDate,articleAuthor, mainText, comment};
}

async function close(page){
    page.close();
}

module.exports.init = init;
module.exports.goto = goto;
module.exports.paging = paging;
module.exports.parser = parser;
module.exports.start = start;
module.exports.close = close;