const dateFormatParse = require("date-format-parse")
function dateNormalization(unnormalizedDate){
    console.log("date in:  "+unnormalizedDate)
    if(isValidDate(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.DD. H:m'))){
      console.log("date out: "+ dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.DD. H:m'), "YYYY-MM-DD"))
      return dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.D. H:m'), "YYYY-MM-DD")
    }
    else if(isValidDate(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.DD.'))){
      console.log("date out: "+ dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.DD.'), "YYYY-MM-DD"))
      return dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY.MM.DD.'), "YYYY-MM-DD")
    }
    if(isValidDate(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD H:m'))){
      console.log("date out: "+ dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD H:m'), "YYYY-MM-DD"))
      return dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD H:m'), "YYYY-MM-DD")
    }
    else if(isValidDate(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD'))){
      console.log("date out: "+ dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD'), "YYYY-MM-DD"))
      return dateFormatParse.format(dateFormatParse.parse(unnormalizedDate, 'YYYY. MM. DD'), "YYYY-MM-DD")
    }
    else if((new RegExp("([0-9])*(시간|분)( 전)")).test(unnormalizedDate)){
      let currentDate = new Date();
      let normalized = unnormalizedDate.match("([0-9])*(시간|분)( 전)")
      if(normalized[2] == "시간"){
        currentDate.setHours(currentDate.getHours() - normalized[1])
      }else if(normalized[2] == "분"){
        currentDate.setMinutes(currentDate.getMinutes() - normalized[1])
      }
      console.log("date out: "+ dateFormatParse.format(currentDate, "YYYY-MM-DD"))
      return dateFormatParse.format(currentDate, "YYYY-MM-DD")
    }
  
  }
  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  module.exports.dateNormalization = dateNormalization