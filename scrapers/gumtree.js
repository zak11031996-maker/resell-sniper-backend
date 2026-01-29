import { chromium } from 'playwright';

export async function scrapeGumtree(query) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(`https://www.gumtree.com/search?search_category=all&q=${encodeURIComponent(query)}`);
  await page.waitForTimeout(4000);

  const items = await page.$$eval('[data-q="search-result"]', els =>
    els.map(el => ({
      title: el.querySelector('h2')?.innerText,
      price: el.innerText.match(/£\d+/)?.[0]?.replace('£',''),
      url: el.querySelector('a')?.href,
      marketplace: 'Gumtree'
    }))
  );

  await browser.close();
  return items;
}
