"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "@/types";
import FormattedPrice from "./FormattedPrice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RentalSummary = () => {
  const [totalAmt, setTotalAmt] = useState(0);
  const router = useRouter();
  const cart = useSelector((state: StoreState) => state?.goRentWheels?.cart || []);

  useEffect(() => {
    let price = 0;
    cart.forEach((item) => {
      if (typeof item?.pricePerDay === "number" && typeof item?.quantity === "number") {
        price += item.pricePerDay * item.quantity;
      }
    });
    setTotalAmt(price);
  }, [cart]);

  const proceedToCheckout = () => {
    if (!cart.length) {
      toast.error("Your cart is empty. Add a car to proceed.");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Rental Summary</h2>
      <p className="text-lg font-semibold mb-2">
        Total Cost: <FormattedPrice amount={totalAmt} />
      </p>
      <button
        onClick={proceedToCheckout}
        className="bg-blue-600 text-white hover:bg-blue-800 px-8 py-3 rounded-lg font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default RentalSummary;
