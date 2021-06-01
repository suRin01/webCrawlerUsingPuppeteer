function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}
  define("strings", {
    baseURL: "searchPageBaseURL",
    dateStart: "searchPageTargetDateStart",
    dateEnd: "searchPageTargetDateEnd",
    dateStartPattern: "searchDateFormatStart",
    dateEndPattern: "searchDateFormatEnd",
    urlSelector: "searchPagePostURLSelector",
    iframeId: "innerIframeId",
    contentSelector: "postSelectorData",
    titleSelector: "title",
    dateSelector: "articleUploadDate",
    authorSelector: "articleAuthor",
    mainTextSelector: "mainText",
    commentSelector: "comment",
    unnecessarySelector: "unnecessaryElements"
  })


  define("naverCafe", {
    source: "naverCafe",
    searchPageBaseURL: "https://cafe.naver.com/ca-fe/home/search/articles?q=%EC%BD%94%EB%A1%9C%EB%82%98&od=1&pr=7&p=",
    searchPageTargetDateStart: "&ps=",
    //ps=2021.05.01
    searchPageTargetDateEnd: "&pe=",
    //pe=2021.05.01
    searchDateFormatStart: "YYYY.MM.DD",
    searchDateFormatEnd: "YYYY.MM.DD",
    searchPagePostURLSelector: "a.item_subject",
    innerIframeId:"cafe_main",
    postSelectorData: {
      title: "h3.title_text",
      articleUploadDate: "div.article_info > span.date",
      articleAuthor: "div.profile_info > div.nick_box > a.nickname",
      mainText: "div.se-main-container, div.ContentRenderer",
      comment: "span.text_comment",
      unnecessaryElements: []
    }
  });

  define("naverBlog", {
    source: "naverBlog",
    searchPageBaseURL: "https://section.blog.naver.com/Search/Post.nhn?rangeType=ALL&orderBy=recentdate&keyword=%EC%BD%94%EB%A1%9C%EB%82%98&pageNo=",
    searchPageTargetDateStart: "&startDate=",
    //startDate=2021-05-12
    searchPageTargetDateEnd: "&endDate=",
    //endDate=2021-05-19
    searchDateFormatStart: "YYYY-MM-DD",
    searchDateFormatEnd: "YYYY-MM-DD",
    searchPagePostURLSelector: "a.desc_inner",
    innerIframeId: "mainFrame",
    postSelectorData: {
      title: "[class*=se-ff-][class*=se-fs-] , div.htitle > span",
      articleUploadDate: ".se_publishDate.pcol2, p._postAddDate",
      articleAuthor: ".link.pcol2, div.nick > strong",
      mainText: "div.se-main-container, div#postViewArea",
      comment: "span.u_cbox_contents, div.u_cbox_text_wrap",
      unnecessaryElements: []
    }
  });
  define("daumCafe", {
    source: "daumCafe",
    searchPageBaseURL: "http://search.daum.net/search?w=cafe&DA=STC&m=board&q=%EC%BD%94%EB%A1%9C%EB%82%98&find=off&sort=timely&lpp=10&period=u&ccl_derivative=&ccl_commercial=&p=",
    searchPageTargetDateStart: "&sd=",
    //20210520000000 date+HHDDMM
    searchPageTargetDateEnd: "&ed=",
    //20210520235959 date+HHDDMM
    searchDateFormatStart: "YYYYMMDD000000",
    searchDateFormatEnd: "YYYYMMDD235959",
    searchPagePostURLSelector: "a.f_link_b",
    innerIframeId: "down",
    postSelectorData: {
      title: "strong.tit_info", 
      articleUploadDate: "div.cover_info > span:nth-child(4)",
      articleAuthor: "div.cover_info > a:nth-child(1)",
      mainText: "div#user_contents",
      comment: "div.comment_post > div.box_post",
      unnecessaryElements: []
    }
  });
  define("daumBlog", {
    source: "daumBlog",
    searchPageBaseURL: "https://search.daum.net/search?w=blog&f=section&SA=daumsec&lpp=10&nil_src=blog&period=u&q=%EC%BD%94%EB%A1%9C%EB%82%98&sort=timely&DA=STC&page=",
    searchPageTargetDateStart: "&sd=",
    //20210520000000 date+HHDDMM
    searchPageTargetDateEnd: "&ed=",
    //20210520235959 date+HHDDMM
    searchDateFormatStart: "YYYYMMDD000000",
    searchDateFormatEnd: "YYYYMMDD235959",
    searchPagePostURLSelector: "a.f_link_b",
    innerIframeId: "",
    postSelectorData: {
      title: "h2.title-article, strong.cB_Title.cB_TitleImage",
      articleUploadDate: "div.box-info > p.date, span.cB_Tdate",
      articleAuthor: "strong.name",
      mainText: "div.tt_article_useless_p_margin, div.cContentBody",
      comment: "div.comment_post > div.box_post, p.text, div.cont, span.text_reply",
      unnecessaryElements: ["div.business_license_layer", "div.container_postbtn"]
    }
  });
