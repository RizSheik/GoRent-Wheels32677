import React from "react";
import Container from "@/components/Container";
import Rentals from "@/components/Rentals";

const RentalBookings = () => {
  return (
    <Container className="py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Your Rental Bookings</h1>
      <Rentals />
    </Container>
  );
};

export default RentalBookings;