"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../types";
import { resetCart } from "@/redux/goRentWheelsSlice";
import FormattedPrice from "./FormattedPrice";
import { motion } from "framer-motion";
import Link from "next/link";
import CartItem from "./CartItem";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  // ✅ Fetch cart items from Redux store
  const cart = useSelector((state: StoreState) => state?.goRentWheels?.cart || []);

  // ✅ Calculate total rental cost using Redux store data
  const totalAmt = cart.reduce((acc, item) => acc + (item.pricePerDay || 0) * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (!session?.user) {
      toast.error("Please log in to proceed to checkout.");
      return;
    }
    window.location.href = "/checkout";
  };

  return (
    <div>
      {cart.length > 0 ? (
        <div className="pb-20">
          <h2 className="text-2xl font-bold text-center mb-5">Rental Cart</h2>
          <div className="mt-5">
            {cart.map((item) => (
              <CartItem key={item?._id} item={item} cart={cart} />
            ))}
          </div>

          <button
            onClick={() => dispatch(resetCart())}
            className="py-2 px-10 bg-red-500 text-white font-semibold uppercase mb-4 hover:bg-red-700 duration-300"
          >
            Reset Cart
          </button>

          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Total Rental Cost</h1>
              <p className="text-lg font-bold text-right">
                <FormattedPrice amount={totalAmt} />
              </p>
              <button
                onClick={handleCheckout}
                className="bg-lightViolet text-white hover:bg-darkViolet hoverEffect px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4 py-32"
        >
          <h1 className="text-xl font-bold uppercase">No Cars in Cart.</h1>
          <Link href="/" className="bg-lightViolet text-white px-8 py-3 rounded-lg font-semibold">
            Go to Cars
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CartContainer;