const crawler = require("../crawler/pupCrawler")
function main(){
  if(process.argv[2] == undefined){
    return;
  }

  crawler.setTarget(process.argv[2])
  crawler.setDuration(new Date(), new Date("2019. 12. 01"));
  
  crawler.start();
  
}

main();
