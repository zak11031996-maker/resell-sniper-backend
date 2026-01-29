export function calculateProfit(listingPrice, soldAvg) {
  if (!listingPrice || !soldAvg) return null;

  const fees = soldAvg * 0.13;  // 13% eBay fees
  const shipping = 10;           // €10 shipping cost assumption

  return Number((soldAvg - listingPrice - fees - shipping).toFixed(2));
}
