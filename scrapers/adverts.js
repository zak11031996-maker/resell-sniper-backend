import { chromium } from 'playwright';

export async function scrapeAdverts(query) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.adverts.ie/for-sale/q_${encodeURIComponent(query)}/`);
  await page.waitForTimeout(4000);

  const items = await page.$$eval('.listing', els =>
    els.map(el => ({
      title: el.querySelector('.title')?.innerText,
      price: el.querySelector('.price')?.innerText?.replace('€',''),
      url: el.querySelector('a')?.href,
      marketplace: 'Adverts.ie'
    }))
  );

  await browser.close();
  return items;
}
