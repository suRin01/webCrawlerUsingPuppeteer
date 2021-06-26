const crawler = require("./crawler/core");
async function main(){
    // if(process.argv[2] === undefined){
    //     return;
    // }

    // await crawler.init(process.argv[2], new Date(), new Date("2019. 12. 01"));
    await crawler.init("naverCafe", new Date(), new Date("2019. 12. 01"));
  
    crawler.start();
  
}

main();