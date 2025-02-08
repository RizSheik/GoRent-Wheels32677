"use client";

import { twMerge } from "tailwind-merge";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCart } from "@/redux/goRentWheelsSlice";
import { CarData } from "@/types";

interface RentNowButtonProps {
  className?: string;
  car: CarData;
}

const RentNowButton: React.FC<RentNowButtonProps> = ({ className, car }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRentNow = () => {
    if (loading) return;
    setLoading(true);

    try {
      dispatch(addToCart(car));
      toast.success(`"${car.name}" added to cart!`);
    } catch (err) {
      console.error("Error adding car to cart:", err);
      toast.error("Failed to add car to cart. Try again.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  return (
    <button
      onClick={handleRentNow}
      disabled={loading}
      className={twMerge(
        "bg-darkViolet text-white w-full py-2 border border-darkViolet hover:border-lightViolet transition-all duration-300 font-semibold tracking-wide flex items-center justify-center gap-1",
        loading ? "opacity-50 cursor-not-allowed" : "",
        className
      )}
    >
      {loading ? "Adding..." : "Rent Now"}
    </button>
  );
};

export default RentNowButton;