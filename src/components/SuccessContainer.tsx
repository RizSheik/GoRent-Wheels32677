"use client";

import { resetCart } from "@/redux/goRentWheelsSlice";
import { StoreState } from "@/types";
import { useSession } from "next-auth/react";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import Link from "next/link";
import { HiCheckCircle, HiHome, HiMail } from "react-icons/hi";
import { HiOutlineTruck } from "react-icons/hi2";
import toast from "react-hot-toast";

const SuccessContainer = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state.goRentWheels);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [totalAmt, setTotalAmt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false); 

  useEffect(() => {
    if (cart.length > 0) {
      setTotalAmt(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    }
  }, [cart]);

  const handleSaveOrder = useCallback(async () => {
    if (!session?.user?.email || cart.length === 0 || saved) return; 

    setLoading(true);
    try {
      const response = await fetch("/api/saveRental", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, email: session.user.email, id, totalAmt }),
      });

      const data = await response.json();
      if (data?.success) {
        dispatch(resetCart());
        setSaved(true); // Mark as saved
        toast.success("Rental successfully saved!");
      } else {
        toast.error("Failed to save rental. Please try again.");
        console.error("Save rental failed:", data);
      }
    } catch (error) {
      toast.error("Error processing your rental. Try again.");
      console.error("Error saving rental order:", error);
    } finally {
      setLoading(false);
    }
  }, [cart, session?.user?.email, id, totalAmt, dispatch, saved]);

  useEffect(() => {
    handleSaveOrder();
  }, [handleSaveOrder]); 

  return (
    <div>
      {loading && <Loader title="Processing rental... Please wait." />}
      <div className="bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-28">
        <div className="max-w-md w-full space-y-8 text-center">
          <HiCheckCircle className="mx-auto h-24 w-24 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Rental Confirmed!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your car rental booking has been successfully completed.
          </p>
          <p className="text-base text-gray-700">
            Thank you for choosing <strong>GoRent Wheels</strong>! You will receive a confirmation email shortly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <button className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
                <HiHome className="mr-2 h-5 w-5" /> Home
              </button>
            </Link>
            <Link href="/rentals">
              <button className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
                <HiOutlineTruck className="mr-2 h-5 w-5" /> My Rentals
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg">
                <HiMail className="mr-2 h-5 w-5" /> Contact
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessContainer;