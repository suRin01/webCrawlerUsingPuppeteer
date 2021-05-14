async function postContentsParser(page, postPageUrl, innerIframeId, selectorData) {
    console.log(postPageUrl)
    await page.goto(postPageUrl, { waitUntil: 'networkidle0' })

    // const selectorData = JSONselectorString["naverCafe"];
    // go through iframe
    const frame = page.frames().find(frame => frame.name() === innerIframeId)
    // const frame = page.frames().find(frame => frame.name() === "cafe_main")

    return await frame.evaluate((selectorData) => {
        let actualPostData = {};
        //get title
        actualPostData["title"] = document.querySelector(selectorData.title).innerText

        //get articleUploadDate
        actualPostData["articleUploadDate"] = document.querySelector(selectorData.articleUploadDate).innerText

        //get articleAuthor
        actualPostData["articleAuthor"] = document.querySelector(selectorData.articleAuthor).innerText

        //get main text
        actualPostData["mainText"] = document.querySelector(selectorData.mainText).innerText

        //get comment
        let comments = document.querySelectorAll(selectorData.comment);
        console.log(comments.length)
        actualPostData["comments"] = [];
        for (let idx = 0, len = comments.length; idx < len; idx++) {
            actualPostData["comments"][idx] = comments[idx].innerText;
        }

        return actualPostData;
    }, selectorData);

}



module.exports.postContentsParser = postContentsParser;