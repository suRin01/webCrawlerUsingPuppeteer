
const htmlHandler = require("./htmlHandler")

async function automaticChromeHandler(browser, JSONconfig, targetDate) {
    const page = await browser.newPage();
    let pageNum = 1;
    let previousPageItemCount = -1;
    let currentPageItemCount = -1;

    // pipe page's console data to terminal
    page.on('console', consoleObj => console.log(consoleObj.text()));

    while((previousPageItemCount==currentPageItemCount) || (previousPageItemCount == -1)){
        previousPageItemCount = currentPageItemCount;

        console.log(`go to ${JSONconfig["searchPageBaseURL"] + pageNum}`)
        await page.goto(JSONconfig["searchPageBaseURL"] + pageNum, { waitUntil: 'networkidle0' })
        let data = await htmlHandler.getUrlsOnSearchPage(page, JSONconfig["searchPagePostURLSelector"], JSONconfig["source"])
        currentPageItemCount = data.length
    
        // get actual data from post with scraped urls
        for (let idx = 0; idx < currentPageItemCount; idx++) {
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

        pageNum += 1;
    }
    

    return data;
}


module.exports.automaticChromeHandler = automaticChromeHandler;