import Container from "@/components/Container";
import CartContainer from "@/components/CartContainer";
import React from "react";

const CartPage = () => {
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Rental Cart</h1>
      <CartContainer />
    </Container>
  );
};

export default CartPage;