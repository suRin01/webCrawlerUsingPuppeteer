async function postContentsParser(page, selectorData) {

    return await page.evaluate((selectorData) => {
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

async function getUrlsOnSearchPage(onPage, elementSelector){
    return await onPage.evaluate((elementSelector)=>{
      let scrappedData = [];
      // const detailAreas = document.querySelectorAll("a.item_subject")
      const detailAreas = document.querySelectorAll(elementSelector)
      
      for(let idx = 0, len = detailAreas.length; idx < len ; idx++){
        scrappedData.push({source:"naverCafe", herf:detailAreas[idx].href})
      }
      return scrappedData;
    }, elementSelector)
  }
  
module.exports.getUrlsOnSearchPage = getUrlsOnSearchPage;

module.exports.postContentsParser = postContentsParser;