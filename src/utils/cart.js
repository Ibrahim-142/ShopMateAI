export function getTotalItems(cart) {
  let total = 0;
  for (let item of cart) {
    total += item.count;
  }
  return total;
}
export function getTotalPrice(cart) { 
  let total = 0;
  for (let item of cart) {
    total += item.product.price * item.count;
  }
  return total;

}
export const getShippingCost = (type) => {
  if (type === "express") return 2000; 
  return 1000; 
};