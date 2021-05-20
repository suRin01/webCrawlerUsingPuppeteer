
const htmlHandler = require("./htmlHandler")

async function automaticChromeHandler(browser, JSONconfig, targetPage) {
    const page = await browser.newPage();
    // pipe page's console data to terminal
    // page.on('console', consoleObj => console.log(consoleObj.text()));

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

    return data;
}


module.exports.automaticChromeHandler = automaticChromeHandler;