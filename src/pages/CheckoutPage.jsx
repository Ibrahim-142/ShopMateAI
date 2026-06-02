import OrderSummary from '../components/OrderSummary';
import ShoppingCart from '../components/ShoppingCart';
const CheckoutPage = () => {
  return (
    <>
      <div className="container mx-auto mt-5 ">
        <div className="sm:flex shadow-md my-10">
          <ShoppingCart />
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;