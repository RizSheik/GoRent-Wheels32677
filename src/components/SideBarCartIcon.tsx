"use client";
import { StoreState } from "@/types";
import Link from "next/link";
import React from "react";
import { FaCarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const SideBarCartIcon = () => {
  const cart = useSelector((state: StoreState) => state?.goRentWheels?.cart || []);

  return (
    <Link
      href="/cart"
      className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-sm shadow-lightGreen overflow-hidden group cursor-pointer relative"
      aria-label="Go to Cart"
    >
      {/* Animated Car Icon */}
      <div className="flex justify-center items-center">
        <FaCarAlt className="text-2xl -translate-x-12 group-hover:translate-x-3 transition-transform duration-200" />
        <FaCarAlt className="text-2xl -translate-x-3 group-hover:translate-x-12 transition-transform duration-200" />
      </div>

      {/* Rent Now Text */}
      <p className="text-xs font-semibold">Rent Now</p>

      {/* Cart Count Badge */}
      {cart.length > 0 && (
        <span className="absolute top-1 right-2 bg-darkViolet text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
          {cart.length}
        </span>
      )}
    </Link>
  );
};

export default SideBarCartIcon;