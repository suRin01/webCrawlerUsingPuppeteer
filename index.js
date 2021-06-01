const puppeteer = require('puppeteer');
const chromeHandler = require("./headlessChromeHandler")


async function main(){
  if(process.argv[2] == undefined){
    return;
  }
  
  const debugMode = false;
  const browser = await puppeteer.launch(Option = { headless: !debugMode, devtools: debugMode , defaultViewport: null});

  let targetDate = new Date("2021. 05. 29");
  let endDate = new Date("2019. 12 .01");
  while(targetDate > endDate){
    await chromeHandler.automaticChromeHandler(browser, crawlerConfig[process.argv[2]], targetDate)
    .then(targetDate = new Date(targetDate.setDate(targetDate.getDate() - 1)))
    .catch
    console.log("naver cafe done")
  }
  await browser.close();
}

main();

// main은 그냥 제일 가벼워야합니다. 진입점