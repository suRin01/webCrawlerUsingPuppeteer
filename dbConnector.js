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
      console.log("Data is created!")
      if(data[idx]["postData"]["comments"].length > 0){
        putComments(r.idx, data[idx]["postData"]["comments"])
      }
    })
    .catch(e=> {
      console.log(e)
    })
  }
    
    
}

function putComments(postId, comments){
  console.log("comment adding start")
  for(let idx=0, len = comments.length; idx<len; idx++){
    models.comments.create({
      post_id: postId,
      comments: comments[idx]
    }).then(r=>{
      console.log("Comment is created")
    }).catch(e=>{
      console.log(e)
    })
  }
}

module.exports.putData = putData