const utils = require("./utils")
async function postContentsParser(page, selectorData) {

    let data = await page.evaluate((selectorData) => {
      //strip unnecessary elements
      for (let idx = 0, len = selectorData["unnecessaryElements"].length; idx < len ; idx++){
        let stripTarget = document.querySelector(selectorData["unnecessaryElements"][idx])
        if (stripTarget != null) {
          stripTarget.parentNode.removeChild(stripTarget);
        }
      }
      let actualPostData = {};
      try{
        //get title
        console.log("    get title")
        actualPostData["title"] = document.querySelector(selectorData.title).innerText
  
        console.log("    get articleUploadDate")
        //get articleUploadDate
        actualPostData["articleUploadDate"] = document.querySelector(selectorData.articleUploadDate).innerText
  
        console.log("    get titarticleAuthorle")
        //get articleAuthor
        actualPostData["articleAuthor"] = document.querySelector(selectorData.articleAuthor).innerText
  
        console.log("    get mainText")
        //get main text
        actualPostData["mainText"] = document.querySelector(selectorData.mainText).innerText
  
        console.log("    get comment")
        //get comment
        let comments = document.querySelectorAll(selectorData.comment);
        console.log(comments.length)
        actualPostData["comments"] = [];
        for (let idx = 0, len = comments.length; idx < len; idx++) {
          console.log("    "+ comments[idx].innerText)
          actualPostData["comments"][idx] = comments[idx].innerText;
        }
      }catch{
        
      }

      return actualPostData;
    }, selectorData);
    data["articleUploadDate"] = utils.dateNormalization(data["articleUploadDate"]);
    console.log(data["articleUploadDate"])

    return data;

}

async function getUrlsOnSearchPage(onPage, elementSelector, postSource){
    return await onPage.evaluate((elementSelector, postSource)=>{
      let scrappedData = [];
      // const detailAreas = document.querySelectorAll("a.item_subject")
      const detailAreas = document.querySelectorAll(elementSelector)
      
      for(let idx = 0, len = detailAreas.length; idx < len ; idx++){
        scrappedData.push({ source: postSource, herf:detailAreas[idx].href})
      }
      return scrappedData;
    }, elementSelector, postSource)
  }


module.exports.getUrlsOnSearchPage = getUrlsOnSearchPage;
module.exports.postContentsParser = postContentsParser;