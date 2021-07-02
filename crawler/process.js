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
    const urlPreset = constants[target];
    while (targetDate > endDate) {
        let pageNum = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const searchPageUrl = urlPreset.searchPageBaseURL + pageNum
                + urlPreset.searchPageTargetDateStart + dateTime.format(targetDate, urlPreset.searchDateFormatStart)
                + urlPreset.searchPageTargetDateEnd + dateTime.format(targetDate, urlPreset.searchDateFormatEnd);
            page = await goto(page,searchPageUrl);

            let targetUrlList = await crawler.querySelectedAllData(page, urlPreset.searchPagePostURLSelector, constants.strings.elementInnerContentType.link);
            if(targetUrlList.length === 0){
                console.log("검색된 링크가 없습니다.");
                break;
            }
            // 이전 페이지 검색 결과와 같은게 있음-> 마지막 페이지 이상의 데이터 긁을때
            const UndeduplicatedUrlListCount = previousTargetUrlList.length + targetUrlList.length;
            const UndeduplicatedUrlList = new Set(previousTargetUrlList.concat(targetUrlList));
            if (UndeduplicatedUrlList.size !== UndeduplicatedUrlListCount) {
                console.log("마지막 페이지 였습니다.");
                break;
            }


            const crawledDataArray = [];
            for (let idx = 0, len = targetUrlList.length; idx < len; idx += 1) {
                page = await goto(page,targetUrlList[idx]);
                let tempPage = await paging(page, target);
                let parsedData = await parser(tempPage, target);
                crawledDataArray.push(db.dbDataConstructor(urlPreset.source, targetUrlList[idx], parsedData.title, parsedData.articleUploadDate, parsedData.articleAuthor, parsedData.mainText, parsedData.comment));
            }
            db.insert(crawledDataArray);
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
    const preset = constants[target];
    // go to innerFrame
    let targetFrame;
    if (constants[target].innerIframeId !== "") {
        console.log(`Find innerFrame, name: ${preset.innerIframeId}`);
        targetFrame = page.frames().find((frame) => frame.name() === preset.innerIframeId);
    } else {
        targetFrame = page;
    }
    // activate comment view
    try{
        await targetFrame.click("a.btn_comment"); 
        await targetFrame
            .waitForSelector(preset.postSelectorData.comment, {timeout: 3000})
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
    const selectorPreset = constants[target].postSelectorData;
    const title = await crawler.querySelectedData(page, selectorPreset.title, constants.strings.elementInnerContentType.text);
    const articleUploadDate = dateTime.normalization(await crawler.querySelectedData(page, selectorPreset.articleUploadDate, constants.strings.elementInnerContentType.text));
    const articleAuthor = await crawler.querySelectedData(page, selectorPreset.articleAuthor, constants.strings.elementInnerContentType.text);
    const mainText = await crawler.querySelectedData(page, selectorPreset.mainText, constants.strings.elementInnerContentType.text, selectorPreset.unnecessaryElements);
    const comment = await crawler.querySelectedAllData(page, selectorPreset.comment, constants.strings.elementInnerContentType.text);

    return {title, articleUploadDate,articleAuthor, mainText, comment};
}

module.exports.init = init;
module.exports.start = start;