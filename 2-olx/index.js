const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://al.olx.com.br/alagoas/maceio/computadores-e-acessorios?pe=3000&q=macbook');
  
  const html = await page.content();
  const $ = cheerio.load(html);
  const items = $('ul#main-ad-list>li.item');
  
  let total = 0;
  items.each( (index, item) => {   
    const title = $(item).find('h2.OLXad-list-title').text().trim();
    if ( title !== '' ) {
      const value = $(item).find('div.col-3').text().replace(/\s/g, "");
      console.log('-->', title, value, $(item).hasClass('yap-loaded') );    
      total++;      
    }    
  });
  console.log('Size: ', total);

  await browser.close();
})();