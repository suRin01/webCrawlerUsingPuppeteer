/* eslint-disable no-undef */

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

module.exports.querySelectedAllData = querySelectedAllData;
module.exports.querySelectedData = querySelectedData;

