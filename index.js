const htmlHandler = require("./htmlHandler")

const puppeteer = require('puppeteer');
const target = {
  "naverCafe":"https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=2&p=",
  "naverBlog":"https://section.blog.naver.com/Search/Post.nhn",
  "daumCafe":"https://top.cafe.daum.net/_c21_/search",
  "daumBlog":"https://search.daum.net/search"
}
const mainTextPageSelector = {
  naverCafe:{
    title : "h3.title_text",
    articleUploadDate : "div.article_info > span.date",
    articleAuthor : "div.profile_info > div.nick_box > a.nickname",
    mainText: "div.se-main-container",
    comment : "span.text_comment",
  }
}



async function getNaverCafeSearchResults(targetPage){
  const debugMode = false;
  const browser = await puppeteer.launch(Option={headless:!debugMode, devtools: debugMode});
  const page = await browser.newPage();
  page.on('console', consoleObj => console.log(consoleObj.text()));

  await page.goto(target.naverCafe + targetPage,  { waitUntil: 'networkidle0' })
  let data = await htmlHandler.getUrlsOnSearchPage(page, "a.item_subject")

  const selectorData = mainTextPageSelector["naverCafe"];

  // get actual data from post with scraped urls
  for(let idx = 0, len = data.length; idx < len; idx++){
    console.log(`Move to ${data[idx]["herf"]}`)
    await page.goto(data[idx]["herf"], { waitUntil: 'networkidle0' })
    const frame = page.frames().find(frame => frame.name() === "cafe_main")

    const returnedActualPostData = await htmlHandler.postContentsParser(frame, selectorData)
    
    data[idx]["postData"] = {};
    data[idx]["postData"] = returnedActualPostData;

  }

  console.log(data);

  await browser.close();
}


function main(){
  getNaverCafeSearchResults(1);
}

main();

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