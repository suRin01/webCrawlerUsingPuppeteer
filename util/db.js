
class db{
  constructor(){
    let mysql = require("mysql2")
    require('dotenv').config()
    this.conn = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_DATABASE,
      port     : process.env.DB_PORT
    })
  }





}



function put(data){
  let mysql = require("mysql2")
  require('dotenv').config()
  let conn = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT
  })

  let postId = putData(conn, )

  for(let idx=0, len=data.length; idx<len; idx++){
    console.log(data[idx]["postData"]["articleUploadDate"])
    let postId = await putData(conn, [data[idx]["source"], data[idx]["herf"], data[idx]["postData"]["title"], data[idx]["postData"]["articleAuthor"], data[idx]["postData"]["articleUploadDate"], data[idx]["postData"]["mainText"]])

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





function putComments(conn, params){
  let sql = "INSERT INTO comments ( post_id, comment ) VALUES(?, ?);"
  conn.query(sql, params, function(err, rows){
    if(err) console.log(err);
    console.log(rows.insertId);
  })
}

async function putData(conn, params){
  let sql = "INSERT INTO data ( source, source_url, title, author, date, main_text) VALUES(?, ?, ?, ?, ?, ?);"
  conn.query(sql, params, async function(err, rows){
    if(err) console.log(err);
    console.log(rows.insertId);
    return rows.insertId;
  })
}








const models = require("./models")
function putData(data) {
  for(let idx=0, len=data.length; idx<len; idx++){
    console.log(data[idx]["postData"]["articleUploadDate"])
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
  for(let idx=0, len = comments.length; idx<len; idx++){
    models.comments.create({
      post_id: postId,
      comment: comments[idx]
    }).then(r=>{
      console.log("Comment is created")
    }).catch(e=>{
      console.log(e)
    })
  }
}

module.exports.putData = putData