import Container from "@/components/Container";
import RentalOrder from "@/components/RentalOrder";
import Title from "@/components/Title";
import React from "react";

const BookingPage = () => {
  return (
    <Container className="py-10">
      <Title>Your Booking</Title>
      <RentalOrder/>
    </Container>
  );
};

export default BookingPage;