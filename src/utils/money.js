export function formatMoney(amountCents) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amountCents / 100);
}
export function totalPriceWithShipping(totalPriceCent,shippingType){
  let shippingCost = 0;
  if (shippingType === "standard") {
    shippingCost = 1000; // $10.00 in cents
  } else if (shippingType === "express") {
    shippingCost = 2000; // $20.00 in cents
  }
  return totalPriceCent + shippingCost;
}