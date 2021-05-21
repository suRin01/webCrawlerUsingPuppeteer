const puppeteer = require('puppeteer');
const chromeHandler = require("./headlessChromeHandler")
const models = require("./models")
const dateFormatParse = require("date-format-parse")
const utils = require("util")
const crawlerConfig = {
  naverCafe:{
    source: "naverCafe",
    searchPageBaseURL: "https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=2&p=",
    searchPageTargetDateStart: "&ps=",
    //ps=2021.05.01
    searchPageTargetDateStart: "&pe=",
    //pe=2021.05.01
    searchDateFormat: "YYYY.MM.DD",
    searchPagePostURLSelector: "a.item_subject",
    innerIframeId:"cafe_main",
    postSelectorData: {
      title: "h3.title_text",
      articleUploadDate: "div.article_info > span.date",
      articleAuthor: "div.profile_info > div.nick_box > a.nickname",
      mainText: "div.se-main-container",
      comment: "span.text_comment",
      unnecessaryElements: []
    }
  },
  naverBlog: {
    source: "naverBlog",
    searchPageBaseURL: "https://section.blog.naver.com/Search/Post.nhn?rangeType=ALL&orderBy=recentdate&keyword=%EC%BD%94%EB%A1%9C%EB%82%98&pageNo=",
    searchPageTargetDateStart: "&startDate=",
    //startDate=2021-05-12
    searchPageTargetDateStart: "&endDate=",
    //endDate=2021-05-19
    searchDateFormat: "YYYY-MM-DD",
    searchPagePostURLSelector: "a.desc_inner",
    innerIframeId: "mainFrame",
    postSelectorData: {
      title: "[class*=se-ff-][class*=se-fs-] , div.htitle > span",
      articleUploadDate: ".se_publishDate.pcol2, p._postAddDate",
      articleAuthor: ".link.pcol2, div.nick > strong",
      mainText: "div.se-main-container, div#postViewArea",
      comment: ".u_cbox_contents, div.u_cbox_text_wrap",
      unnecessaryElements: []
    }
  },
  daumCafe: {
    source: "daumCafe",
    searchPageBaseURL: "http://search.daum.net/search?w=cafe&DA=STC&m=board&q=%EC%BD%94%EB%A1%9C%EB%82%98&find=off&sort=timely&lpp=10&period=u&ccl_derivative=&ccl_commercial=&p=",
    searchPageTargetDateStart: "&sd=",
    //20210520000000 date+HHDDMM
    searchPageTargetDateStart: "&ed=",
    //20210520235959 date+HHDDMM
    searchDateFormat: "YYYYMMDD",
    searchPagePostURLSelector: "a.link_tit",
    innerIframeId: "down",
    postSelectorData: {
      title: "strong.tit_info",
      articleUploadDate: "div.cover_info > span:nth-child(4)",
      articleAuthor: "div.cover_info > a:nth-child(1)",
      mainText: "div#user_contents",
      comment: "div.comment_post > div.box_post",
      unnecessaryElements: []
    }
  },
  daumBlog: {
    source: "daumBlog",
    searchPageBaseURL: "https://search.daum.net/search?w=blog&f=section&SA=daumsec&lpp=10&nil_src=blog&period=u&q=%EC%BD%94%EB%A1%9C%EB%82%98&sort=timely&DA=STC&page=",
    searchPageTargetDateStart: "&sd=",
    //20210520000000 date+HHDDMM
    searchPageTargetDateStart: "&ed=",
    //20210520235959 date+HHDDMM
    searchDateFormat: "YYYYMMDD",
    searchPagePostURLSelector: "a.f_link_b",
    innerIframeId: "",
    postSelectorData: {
      title: "h2.title-article, strong.cB_Title.cB_TitleImage",
      articleUploadDate: "div.box-info > p.date, span.cB_Tdate",
      articleAuthor: "strong.name",
      mainText: "div.tt_article_useless_p_margin, div.cContentBody",
      comment: "div.comment_post > div.box_post, div.item-reply.rp_general",
      unnecessaryElements: ["div.business_license_layer", "div.container_postbtn"]
    }
  }
}



async function main(){
  
  const debugMode = false;
  const browser = await puppeteer.launch(Option = { headless: !debugMode, devtools: debugMode });

  let crawledData = await chromeHandler.automaticChromeHandler(browser, crawlerConfig["daumBlog"])

  for(let idx=0, len=crawledData.length; idx<len; idx++){
    console.log(crawledData[idx])
  }

  await browser.close();
}

main();
