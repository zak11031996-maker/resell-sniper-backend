import express from 'express';
import cors from 'cors';

import { scrapeDoneDeal } from '../scrapers/donedeal.js';
import { scrapeAdverts } from '../scrapers/adverts.js';
import { scrapeGumtree } from '../scrapers/gumtree.js';
import { getAvgSoldPrice } from '../services/ebaySold.js';
import { calculateProfit } from '../services/profit.js';

const app = express();
app.use(cors());

app.get('/search', async (req, res) => {
  const { q } = req.query;

  const [dd, adv, gum] = await Promise.all([
    scrapeDoneDeal(q),
    scrapeAdverts(q),
    scrapeGumtree(q)
  ]);

  const soldAvg = await getAvgSoldPrice(q);

  const results = [...dd, ...adv, ...gum].map(item => ({
    ...item,
    profit: calculateProfit(Number(item.price), soldAvg),
    soldAvg
  }));

  res.json(results.filter(r => r.profit && r.profit > 0));
});

app.listen(3000, () => console.log('API running on port 3000'));
