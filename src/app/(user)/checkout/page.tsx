import Container from "@/components/Container";
import Checkout from "@/components/Checkout";

const CheckoutPage = () => {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Checkout</h1>
      <Checkout />
    </Container>
  );
};

export default CheckoutPage;