const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

(async () => {
    const URL = 'http://gedsonmarcelino.me/site/';

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto( URL );
    const html = await page.content();
    const $ = cheerio.load(html);

    const title = $('h1').first().text();
    console.log('Title: ', title);

    await browser.close();
})();