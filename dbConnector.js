
const models = require("./models")
const dateFormatParse = require("date-format-parse")
function putData(data) {
    models.data.create({
        source: data[idx]["source"],
        source_url:data[idx]["herf"] ,
        title: data[idx]["postData"]["title"],
        author: data[idx]["postData"]["articleAuthor"],
        
        date: dateFormatParse.format(dateFormatParse.parse(data[idx]["postData"]["articleUploadDate"], 'YY.MM.DD HH:mm'), "YYYY-MM-DD"),
        main_text: data[idx]["postData"]["mainText"]
      }).then(() =>{
        console.log("Data is created!")
      })
      .catch(e=> {
        console.log(e)
      })
    
}

module.exports.putData = putData