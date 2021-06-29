let mysql = require("mysql2/promise");

async function put(data){
    require("dotenv").config();
    let conn = await mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE,
        port     : process.env.DB_PORT
    });

    for(let idx=0, len=data.length; idx<len; idx++){
        asyncPutData(conn, data[idx]);
    }

}


function asyncPutData(conn, params){
    let sql = "INSERT INTO data ( source, source_url, title, author, date, main_text) VALUES(?, ?, ?, ?, ?, ?);";
    conn.query(sql, [params.source, params.herf, params.postData.title, params.postData.articleAuthor, params.postData.articleUploadDate, params.postData.mainText])
        .then(([rows])=>{
            console.log("Data added");
            // on insert success: field === undefined
            for(let idx = 0, len = params.postData.comments.length; idx <len; idx++){
                asyncPutComment(conn, [rows.insertId, params.postData.comments[idx]]);
            }
        })
        .catch(e=>{
            console.log(e);
        });
}
function asyncPutComment(conn, params){
    let sql = "INSERT INTO comments ( post_id, comment ) VALUES(?, ?);";
    conn.query(sql, params)
        .catch(e=>{
            console.log(e);
        });
}

function dbDataConstructor(source, href, title, articleUploadDate, articleAuthor, mainText, comment){
    let data = {
        source: source,
        herf: href,
        postData: {
            title: title,
            articleUploadDate: articleUploadDate,
            articleAuthor: articleAuthor,
            mainText: mainText,
            comments: comment
        }
    };

    return data;
}


module.exports.put = put;
module.exports.dbDataConstructor = dbDataConstructor;