const db = require("./dbConnector")
const htmlHandler = require("./htmlHandler")
const dateFormatParse = require("date-format-parse")

async function automaticChromeHandler(browser, JSONconfig, targetDate) {
    const page = await browser.newPage();
    let pageNum = 1;
    let previousPageItemCount = -1;
    let currentPageItemCount = -1;

    // pipe page's console data to terminal
    // page.on('console', consoleObj => console.log(consoleObj.text()));

    while((previousPageItemCount==currentPageItemCount) || (previousPageItemCount == -1)){
        previousPageItemCount = currentPageItemCount;
        let targetDateSearchPage = JSONconfig["searchPageBaseURL"] + pageNum  
                + JSONconfig["searchPageTargetDateStart"] + dateFormatParse.format(targetDate, JSONconfig["searchDateFormatStart"])
                + JSONconfig["searchPageTargetDateEnd"] + dateFormatParse.format(targetDate, JSONconfig["searchDateFormatEnd"])
        console.log(`go to ${targetDateSearchPage}`)
        await page.goto(targetDateSearchPage, { waitUntil: 'networkidle0' })
        .catch(e=>{
            console.log(e);
        })
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
            // console.log(data[idx]["postData"])
            
            
        }
        db.putData(data)
 
        pageNum += 1;
    }
    return;
}


module.exports.automaticChromeHandler = automaticChromeHandler;