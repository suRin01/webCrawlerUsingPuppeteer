const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({
    fullPage: true,
    path: 'example.png' 
    });

  await browser.close();
})();