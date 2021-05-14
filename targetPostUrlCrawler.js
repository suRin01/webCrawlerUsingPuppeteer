async function getUrlsOnSearchPage(onPage, searchPageUrl, elementSelector){
  // get post page url list
  await onPage.goto(searchPageUrl,  { waitUntil: 'networkidle0' })
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