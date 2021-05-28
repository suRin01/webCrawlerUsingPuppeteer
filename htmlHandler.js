const utils = require("./utils")
async function postContentsParser(page, selectorData) {

  try{
    await page.click("a.btn_comment "); 
    await page
      .waitForSelector(selectorData.comment, {timeout: 5000})
      .catch(()=>{
        console.log("No comments")
      })

  }catch{ }


  let data = await page.evaluate((selectorData) => {
    //strip unnecessary elements
    for (let idx = 0, len = selectorData["unnecessaryElements"].length; idx < len; idx++) {
      let stripTarget = document.querySelector(selectorData["unnecessaryElements"][idx])
      if (stripTarget != null) {
        stripTarget.parentNode.removeChild(stripTarget);
      }
    }
    let actualPostData = {};
    
    try {
      let title = document.querySelector(selectorData.title)
      if(title != undefined){
        actualPostData["title"] = title.innerText
      }
      
      let articleUploadDate = document.querySelector(selectorData.articleUploadDate)
      if(articleUploadDate != undefined){
        actualPostData["articleUploadDate"] = articleUploadDate.innerText
      }
      
      let articleAuthor = document.querySelector(selectorData.articleAuthor)
      if(articleAuthor != undefined){
        actualPostData["articleAuthor"] = articleAuthor.innerText
      }
      
      let mainText = document.querySelector(selectorData.mainText)
      if(mainText != undefined){
        actualPostData["mainText"] = mainText.innerText
      }

      let comments = document.querySelectorAll(selectorData.comment);
      actualPostData["comments"] = [];
      for (let idx = 0, len = comments.length; idx < len; idx++) {
        console.log("    " + comments[idx].innerText)
        actualPostData["comments"][idx] = comments[idx].innerText;
      }

    } catch { }

    return actualPostData;
  }, selectorData);
  data["articleUploadDate"] = utils.dateNormalization(data["articleUploadDate"]);
  
  await page.waitFor(3000);
  return data;

}

async function getUrlsOnSearchPage(onPage, elementSelector, postSource) {
  return await onPage.evaluate((elementSelector, postSource) => {
    let scrappedData = [];
    // const detailAreas = document.querySelectorAll("a.item_subject")
    const detailAreas = document.querySelectorAll(elementSelector)

    for (let idx = 0, len = detailAreas.length; idx < len; idx++) {
      scrappedData.push({ source: postSource, herf: detailAreas[idx].href })
    }
    return scrappedData;
  }, elementSelector, postSource)
}


module.exports.getUrlsOnSearchPage = getUrlsOnSearchPage;
module.exports.postContentsParser = postContentsParser;