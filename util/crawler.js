/* eslint-disable no-undef */
const puppeteer = require("puppeter");
const dateFormatParser = require("date-format-parse");
const dateNormalization = require("./dateTime");
const db = require("./db");

let endDate = new Date();
let targetDate = new Date();
const strings = require("../common/constant");

let selector;

let browser;

function setDuration(_startDate, _endDate) {
    targetDate = _startDate;
    endDate = _endDate;
}

function setTarget(target) {
    selector = require("../common/constant")[target];
}

async function start(debugMode = false) {
    browser = await puppeteer.launch({ headless: !debugMode, devtools: debugMode, defaultViewport: null });

    console.log("Start Crawling");
    const page = await browser.newPage();

    let previousTargetUrlList = [];
    while (targetDate > endDate) {
        let pageNum = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const searchPageUrl = selector.searchPageBaseURL + pageNum
                + selector.searchPageTargetDateStart + dateFormatParser.format(targetDate, selector.searchDateFormatStart)
                + selector.searchPageTargetDateEnd + dateFormatParser.format(targetDate, selector.searchDateFormatEnd);

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
            targetUrlList = await querySelectedAllData(page, selector.searchPagePostURLSelector, strings.elementInnerContentType.link);

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
                const result = await page.goto(targetUrlList[idx], { waitUntil: strings.waitUntil })
                    .then(() => 0)
                    .catch((e) => {
                        console.log(e);
                        return undefined;
                    });
                if (result === undefined) {
                    console.log("Page is not responding currently");
                    continue;
                }
                let frame;
                if (selector.innerIframeId !== "") {
                    console.log(`Find innerFrame, name: ${selector.innerIframeId}`);
                    frame = page.frames().find((frame) => frame.name() === selector.innerIframeId);
                } else {
                    frame = page;
                }
                const title = await querySelectedData(frame, selector.postSelectorData.title, strings.elementInnerContentType.text);
                const articleUploadDate = dateNormalization(await querySelectedData(frame, selector.postSelectorData.articleUploadDate, strings.elementInnerContentType.text));
                const articleAuthor = await querySelectedData(frame, selector.postSelectorData.articleAuthor, strings.elementInnerContentType.text);
                const mainText = await querySelectedData(frame, selector.postSelectorData.mainText, strings.elementInnerContentType.text, selector.postSelectorData.unnecessaryElements);
                const comment = await querySelectedAllData(frame, selector.postSelectorData.comment, strings.elementInnerContentType.text);

                crawledDataArray.push(db.dbDataConstructor(selector.source, targetUrlList[idx], title, articleUploadDate, articleAuthor, mainText, comment));
            }

            db.put(crawledDataArray);
            previousTargetUrlList = targetUrlList;
            pageNum += 1;
        }
        targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1));
    }
}

async function querySelectedData(page, selector, type, unnecessarySelector = undefined) {
    const data = await page.evaluate((selector, type, unnecessarySelector) => {
    // remove unwanted elements
        if (unnecessarySelector !== undefined) {
            for (const key in unnecessarySelector) {
                if (Object.hasOwnProperty.call(unnecessarySelector, key)) {
                    const element = unnecessarySelector[key];
                    const stripTarget = document.querySelector(element);
                    if (stripTarget != null) {
                        stripTarget.parentNode.removeChild(stripTarget);
                    }
                }
            }
        }
        console.log(document.querySelector(selector)[type]);

        return document.querySelector(selector)[type];
    }, selector, type, unnecessarySelector)
        .catch((e) => {
            console.log(e);
            console.log(`해당 게시물에 ${selector}로 검색된 데이터가 존재하지 않습니다`);
        });

    return data;
}

async function querySelectedAllData(page, selector, type, unnecessarySelector = undefined) {
    const data = await page.evaluate((selector, type, unnecessarySelector) => {
    // remove unwanted elements
        if (unnecessarySelector !== undefined) {
            for (const key in removeData) {
                if (Object.hasOwnProperty.call(removeData, key)) {
                    const element = removeData[key];
                    const stripTarget = document.querySelector(element);
                    if (stripTarget != null) {
                        stripTarget.parentNode.removeChild(stripTarget);
                    }
                }
            }
        }

        const data = document.querySelectorAll(selector);
        const returnData = [];
        for (idx = 0, len = data.length; idx < len; idx++) {
            returnData[idx] = data[idx][type];
        }
        return returnData;
    }, selector, type, unnecessarySelector)
        .catch((e) => {
            console.log(e);
        });

    return data;
}

module.exports.start =start;
module.exports.setDuration =setDuration;
module.exports.setTarget =setTarget;
module.exports.querySelectedAllData = querySelectedAllData;
module.exports.querySelectedData = querySelectedData;

