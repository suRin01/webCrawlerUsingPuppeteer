async function main(){
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch(Option = { headless: false, devtools: true });
    const page = await browser.newPage();
    page.on('console', consoleObj => console.log(consoleObj.text()));
    await page.goto("https://cafe.naver.com/momsolleh/303434?art=aW50ZXJuYWwtY2FmZS13ZWItc2VjdGlvbi1zZWFyY2gtbGlzdA.eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjYWZlVHlwZSI6IkNBRkVfVVJMIiwiYXJ0aWNsZUlkIjozMDM0MzQsImNhZmVVcmwiOiJtb21zb2xsZWgiLCJpc3N1ZWRBdCI6MTYyMDkwMjcwMzY2NX0._e1FPB_TyMb8Y7s7ZgSwhkL17G5hIL87ADytxjMFHYc", { waitUntil: 'networkidle0' })
    
    const frame = page.frames().find(frame => frame.name() === "cafe_main")
    
    await frame.evaluate(async () => {
        //document.querySelector("#cafe_main")
        let test = document.querySelector("h3.title_text").innerText;
        console.log(test)
    
        await new Promise(resolve => setTimeout(resolve, 10000));
    })
}


main();