let mysql = require("mysql2/promise")

async function put(data){
  require('dotenv').config()
  let conn = await mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT
  })

  for(let idx=0, len=data.length; idx<len; idx++){
    asyncPutData(conn, data[idx])
  }

}

function asyncPutComment(conn, params){
  let sql = "INSERT INTO comments ( post_id, comment ) VALUES(?, ?);"
  conn.query(sql, params)
  .catch(e=>{
    console.log(e)
  })
}

function asyncPutData(conn, params){
  let sql = "INSERT INTO data ( source, source_url, title, author, date, main_text) VALUES(?, ?, ?, ?, ?, ?);"
  conn.query(sql, [params.source, params.herf, params.postData.title, params.postData.articleAuthor, params.postData.articleUploadDate, params.postData.mainText])
  .then(([rows, fields])=>{
    console.log(rows.insertId)
    // on insert success: field === undefined
    for(let idx = 0, len = params.postData.comments.length; idx <len; idx++){
      asyncPutComment(conn, [rows.insertId, params.postData.comments[idx]])
    }
  })
  .catch(e=>{
    console.log(e)
  })
}



module.exports.put = put