const crawler = require("./crawler/core");
function main(){
    if(process.argv[2] === undefined){
        return;
    }

    crawler.init(process.argv[2], new Date(), new Date("2019. 12. 01"));
  
    crawler.start();
  
}

main();
