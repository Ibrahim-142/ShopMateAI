export function calculateOrderSubtotal(cart = []) {
    return cart.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 0);
    }, 0);
}
