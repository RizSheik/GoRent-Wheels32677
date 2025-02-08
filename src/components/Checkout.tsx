"use client";
import { useSelector } from "react-redux";
import { StoreState } from "@/types";
import React, { useState } from "react";
import FormattedPrice from "./FormattedPrice";
import toast from "react-hot-toast";

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state: StoreState) => state?.goRentWheels?.cart || []);

  const totalAmt = cart.reduce((acc, item) => {
    if (typeof item?.pricePerDay === "number" && typeof item?.quantity === "number") {
      return acc + item.pricePerDay * item.quantity;
    }
    return acc;
  }, 0);

  const handlePayment = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      toast.error("Error processing payment. Try again.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      {cart.length > 0 ? (
        <>
          <p className="text-lg font-semibold mb-2">
            Total: <FormattedPrice amount={totalAmt} />
          </p>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-lightViolet text-white px-6 py-3 rounded-lg font-semibold hover:bg-darkViolet transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
