const crawler = require("../crawler/pupCrawler")

crawler.setTarget("naverCafe")
crawler.setDuration(new Date(), new Date("2019. 12. 01"));

crawler.start();

// const cw = new crawler("naverCafe", false)


//??? what is class in js