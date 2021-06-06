const crawler = require("../crawler/pupCrawler")

let cw = new crawler("naverCafe", false);
cw.setDuration(new Date(), new Date("2019. 12. 01"));

cw.start();



// const cw = new crawler("naverCafe", false)


//??? what is class in js