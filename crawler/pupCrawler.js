class crawler{
    endDate = new Date()
    startDate = new Date()
    debugMode = false
    constructor(target, debugMode){
        this.target = target
        this.config = require("../common/constant")[this.target]
        this.browser = require("puppeteer").launch(Option = { headless: !debugMode, devtools: debugMode , defaultViewport: null});

    }

    setup(startDate, endDate){
        this.startDate = startDate
        this.endDate = endDate
    }

    async start(){
        while(this.startDate > this.endDate){
            let targetUrlList = await this.getUrlList()
            targetUrlList.forEach(async (targetUrl) => {
                let crawledData = await this.getHtmlData(targetUrl);
                let refinedData = dataNormalize(crawledData);
                putDataToDB(refinedData);
            });
            this.startDate = new Date(startDate.setDate(startDate.getDate() - 1));
        }
        
    }

    async getUrlList(){

    }

    async getHtmlData(){
    
    }

    dataNormalize(){

    }

    putDataToDB(){

    }


}