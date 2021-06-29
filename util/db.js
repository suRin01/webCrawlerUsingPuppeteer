let mysql = require("mysql2/promise");
const query = require("../common/constant").SqlQueryString;
async function insert(data){
    require("dotenv").config();
    let conn = await mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_DATABASE,
        port     : process.env.DB_PORT
    });

    for(let idx=0, len=data.length; idx<len; idx++){
        asyncInsertData(conn, data[idx]);
    }

}


function asyncInsertData(conn, params){
    conn.query(query.insertData, [params.source, params.herf, params.postData.title, params.postData.articleAuthor, params.postData.articleUploadDate, params.postData.mainText])
        .then(([rows])=>{
            console.log("Data added");
            // on insert success: field === undefined
            for(let idx = 0, len = params.postData.comments.length; idx <len; idx++){
                asyncInsertComment(conn, [rows.insertId, params.postData.comments[idx]]);
            }
        })
        .catch(e=>{
            console.log(e);
        });
}
function asyncInsertComment(conn, params){
    conn.query(query.insertComment, params)
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


module.exports.insert = insert;
module.exports.dbDataConstructor = dbDataConstructor;