/* eslint-disable no-undef */

async function querySelectedData(page, selector, type) {
    const data = await page.evaluate((selector, type) => {
        console.log(document.querySelector(selector)[type]);

        return document.querySelector(selector)[type];
    }, selector, type)
        .catch((e) => {
            console.log(e);
            console.log(`해당 게시물에 ${selector}로 검색된 데이터가 존재하지 않습니다`);
        });

    return data;
}

async function querySelectedAllData(page, selector, type) {
    const data = await page.evaluate((selector, type) => {


        const data = document.querySelectorAll(selector);
        const returnData = [];
        for (idx = 0, len = data.length; idx < len; idx++) {
            returnData.push(data[idx][type]);
        }
        return returnData;
    }, selector, type)
        .catch((e) => {
            console.log(e);
            return [];
        });

    return data;
}

module.exports.querySelectedAllData = querySelectedAllData;
module.exports.querySelectedData = querySelectedData;

