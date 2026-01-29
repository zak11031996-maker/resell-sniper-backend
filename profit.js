export function calculateProfit(listingPrice, soldAvg) {
  if (!listingPrice || !soldAvg) return null;

  const fees = soldAvg * 0.13;
  const shipping = 10;

  return Number((soldAvg - listingPrice - fees - shipping).toFixed(2));
}
