const puppeteer = require('puppeteer');
const target = {
  "naverCafe":"https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=2&p=",
  "naverBlog":"https://section.blog.naver.com/Search/Post.nhn",
  "daumCafe":"https://top.cafe.daum.net/_c21_/search",
  "daumBlog":"https://search.daum.net/search"
}


async function getNaverCafeSearchResults(targetPage){
  const browser = await puppeteer.launch({headless :"false"});
  const page = await browser.newPage();
  await page.goto(target.naverCafe+targetPage,  { waitUntil: 'networkidle0' })
  let data = await page.evaluate(()=>{
    let scrappedData = [];
    const detailAreas = document.querySelectorAll("a.item_subject")
    // const detailAreas = document.querySelectorAll("div.detail_area")
    console.log(detailAreas)
    //push target url to 
    for(let i = 0; i < detailAreas.length; i++){
      scrappedData.push({source:"naverCafe", herf:detailAreas[i].href})
    }    
    return scrappedData;
  })

  for(let i = 0; i < data.length; i++){
    console.log(data[i]["herf"])
    console.log("Move to "+data[i]["herf"])
    await page.goto(data[i]["herf"])
    await page.evaluate(()=>{
      // title : div.title_atrea
      // articleUploadDate : div.article_info > span.date
      // articleAuthor : div.profile_info > div.nick_box > a.nickname
      // main text: p.se-text-paragraph-align-
      // comment : span.text_comment
      
      //get title
      this.data[this.i].title = document.querySelector("div.title_atrea").innerText
      //get articleUploadDate
      
      //get articleAuthor

      //get main text

      //get comment



    })
  }

  console.log(data);

  await browser.close();
}


function main(){
  getNaverCafeSearchResults(1);
}

main();

//screenshot example
/*
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({
    fullPage: true,
    path: 'example.png' 
    });

  await browser.close();
})();

*/

/*


naver cafe
https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=2&p=1
q=(string)searchTopic
od=(int)page -> 최신순 정렬
p=(int)page -> 정확도순 정렬
#app > div > div.container > div > div.SectionSearchContent > div.section_search_content > div > div.article_list_area > ul > li:nth-child(1)
#app > div > div.container > div > div.SectionSearchContent > div.section_search_content > div > div.article_list_area > ul > li:nth-child(2)


naver blog
https://section.blog.naver.com/Search/Post.nhn?pageNo=1&rangeType=ALL&orderBy=recentdate&keyword=%EC%BD%94%EB%A1%9C%EB%82%98
pageNo=(int)page
rangeType=(string)search date range
orderBy=(string)recentdate/sim -> 최신순/정확도순 정렬
keyword=(string)searchTopic

daum cafe
https://top.cafe.daum.net/_c21_/search?search_opt=board&sort_type=recency&q=%EC%BD%94%EB%A1%9C%EB%82%98


daum blog
https://search.daum.net/search?w=blog&f=section&SA=daumsec&lpp=10&nil_src=blog&q=%EC%BD%94%EB%A1%9C%EB%82%98&sort=timely&page=1&DA=STC




*/