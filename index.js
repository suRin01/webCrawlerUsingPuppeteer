const crawler = require("./crawler/core");
async function main(){
    await crawler.init("naverCafe", new Date(), new Date("2019. 12. 01"));
  
    crawler.start();
  
}

main();