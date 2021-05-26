const models = require("./models")
function putData(data) {
  for(let idx=0, len=data.length; idx<len; idx++){
    models.data.create({
      source: data[idx]["source"],
      source_url:data[idx]["herf"] ,
      title: data[idx]["postData"]["title"],
      author: data[idx]["postData"]["articleAuthor"],
      
      date: data[idx]["postData"]["articleUploadDate"],
      main_text: data[idx]["postData"]["mainText"]
    }).then((r) =>{
      console.log(r.idx)
      putComments(r.idx, data[idx]["comments"])
      console.log("Data is created!")
    })
    .catch(e=> {
      // console.log(e)
    })
  }
    
    
}

function putComments(postId, comments){
  for(let idx=0, len = comments.length; idx<len; idx++){
    models.comments.create({
      post_id: postId,
      comments: comments[idx]
    })
  }
}

module.exports.putData = putData