import axios from 'axios';

export async function getAvgSoldPrice(query) {
  // Replace with your eBay API key if you have one
  const res = await axios.get(
    `https://api.ebay.com/buy/browse/v1/item_summary/search`,
    {
      headers: { Authorization: `Bearer ${process.env.EBAY_TOKEN}` },
      params: { q: query, filter: 'soldItems' }
    }
  );

  const prices = res.data.itemSummaries.map(i => Number(i.price.value));
  return prices.length ? prices.reduce((a,b)=>a+b,0)/prices.length : null;
}
