const puppeteer = require('puppeteer');
const htmlHandler = require("./htmlHandler")

async function automaticChromeHandler(JSONconfig, targetPage) {
    const debugMode = false;
    const browser = await puppeteer.launch(Option = { headless: !debugMode, devtools: debugMode });
    const page = await browser.newPage();
    page.on('console', consoleObj => console.log(consoleObj.text()));

    console.log(`go to ${JSONconfig["searchPageBaseURL"] + targetPage}`)
    await page.goto(JSONconfig["searchPageBaseURL"] + targetPage, { waitUntil: 'networkidle0' })
    let data = await htmlHandler.getUrlsOnSearchPage(page, JSONconfig["searchPagePostURLSelector"], JSONconfig["source"])


    // get actual data from post with scraped urls
    for (let idx = 0, len = data.length; idx < len; idx++) {
        console.log(`go to ${data[idx]["herf"]}`)
        await page.goto(data[idx]["herf"], { waitUntil: 'networkidle0' })
        let frame;
        if (JSONconfig["innerIframeId"] != "") {
            frame = page.frames().find(frame => frame.name() === JSONconfig["innerIframeId"])
        }
        else {
            frame = page;
        }

        const returnedActualPostData = await htmlHandler.postContentsParser(frame, JSONconfig["postSelectorData"])

        data[idx]["postData"] = {};
        data[idx]["postData"] = returnedActualPostData;

    }
    console.log(data);

    await browser.close();
}


module.exports.automaticChromeHandler = automaticChromeHandler;