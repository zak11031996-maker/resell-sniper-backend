import { chromium } from 'playwright';

export async function scrapeDoneDeal(query) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(`https://www.donedeal.ie/all?words=${encodeURIComponent(query)}`);
  await page.waitForTimeout(4000);

  const items = await page.$$eval('[data-testid="card"]', cards =>
    cards.map(card => ({
      title: card.querySelector('h2')?.innerText,
      price: card.innerText.match(/€\d+/)?.[0]?.replace('€',''),
      url: card.querySelector('a')?.href,
      marketplace: 'DoneDeal'
    }))
  );

  await browser.close();
  return items;
}
