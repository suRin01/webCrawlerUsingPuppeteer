const chromeHandler = require("./headlessChromeHandler")
const crawlerConfig = {
  naverCafe:{
    source: "naverCafe",
    searchPageBaseURL: "https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=2&p=",
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
    searchPageBaseURL: "https://top.cafe.daum.net/_c21_/search?search_opt=board&SearchType=tab&sort_type=recency&q=%EC%BD%94%EB%A1%9C%EB%82%98&p=",
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
    searchPageBaseURL: "https://search.daum.net/search?w=blog&f=section&SA=daumsec&lpp=10&nil_src=blog&q=%EC%BD%94%EB%A1%9C%EB%82%98&sort=timely&DA=STC&page=",
    searchPagePostURLSelector: "a.f_link_b",
    innerIframeId: "",
    postSelectorData: {
      title: "h2.title-article, strong.cB_Title.cB_TitleImage",
      articleUploadDate: "div.box-info > p.date, span.cB_Tdate",
      articleAuthor: "strong.name",
      mainText: "div.tt_article_useless_p_margin, div.cContentBody",
      comment: "div.comment_post > div.box_post",
      unnecessaryElements: ["div.business_license_layer", "div.container_postbtn"]
    }
  }
}



function main(){
  chromeHandler.automaticChromeHandler(crawlerConfig["daumBlog"], 1)
}

main();

/*



daum blog
https://search.daum.net/search?w=blog&f=section&SA=daumsec&lpp=10&nil_src=blog&q=%EC%BD%94%EB%A1%9C%EB%82%98&sort=timely&page=1&DA=STC




*/