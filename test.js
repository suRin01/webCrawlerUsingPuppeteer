let testArr = {
    title: "strong.tit_info",
    articleUploadDate: "div.cover_info > span:nth-child(4)",
    articleAuthor: "div.cover_info > a:nth-child(1)",
    mainText: "div#user_contents",
    comment: "div.comment_post > div.box_post",
    unnecessaryElements: []
}



async function test(params) {
    for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
            const element = params[key];
            console.log(element)       
        }
    }
}

test(testArr)