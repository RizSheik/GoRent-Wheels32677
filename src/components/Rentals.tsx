"use client";

import { db } from "@/firebase";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import FormattedPrice from "./FormattedPrice";
import { CarData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/Table";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui"; 

import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

interface Rental {
  id: string;
  value: {
    amount: number;
    duration: number;
    pickupDate: string;
    dropoffDate: string;
    items: CarData[];
  };
}

const Rentals = () => {
  const { data: session } = useSession();
  const [expandedRentalId, setExpandedRentalId] = useState<string | null>(null);
  const userEmail = session?.user?.email;

  // ✅ Firestore Query (only if user is logged in)
  const rentalsQuery = userEmail ? query(collection(db, "users", userEmail, "rentals")) : null;
  const [rentalsSnapshot, loading, error] = useCollection(rentalsQuery);

  const rentals = rentalsSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Rental[];

  const toggleDetails = (rentalId: string) => {
    setExpandedRentalId((prev) => (prev === rentalId ? null : rentalId));
  };

  const handleDeleteRental = async (id: string) => {
    try {
      if (!userEmail) return;
      await deleteDoc(doc(db, "users", userEmail, "rentals", id));
      toast.success("Rental record deleted successfully.");
    } catch (error) {
      console.error("Error deleting rental:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // ✅ Redirect user to login if not authenticated
  if (!userEmail) {
    return <div className="text-red-500 font-semibold">Please log in to view your rentals.</div>;
  }

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-400" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600">Error loading rentals: {error.message}</div>
      ) : (
        <div className="flex flex-col gap-5">
          {rentals?.length ? (
            rentals.map((rental: Rental) => (
              <div key={rental.id}>
                <Card className={expandedRentalId === rental.id ? "border-darkViolet/30" : ""}>
                  <CardHeader>
                    <CardTitle>
                      Rental ID: <span className="text-base tracking-wide">{rental.id.slice(-10)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-black/60">Total Amount</p>
                        <FormattedPrice amount={rental.value.amount} className="text-lg font-semibold" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-black/60">Rental Duration</p>
                        <span className="text-lg font-semibold">{rental.value.duration} days</span>
                      </div>
                      <Button onClick={() => toggleDetails(rental.id)}>
                        {expandedRentalId === rental.id ? "Hide Details" : "Show Details"}
                      </Button>
                      <Button onClick={() => handleDeleteRental(rental.id)} variant="delete">
                        <MdClose className="text-base mt-1" /> Delete Rental
                      </Button>
                    </div>
                  </CardContent>

                  <AnimatePresence>
                    {expandedRentalId === rental.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 border-t rounded-none">
                          <CardHeader>
                            <CardTitle>Rental Details</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Car</TableHead>
                                  <TableHead className="text-center">Price/Day</TableHead>
                                  <TableHead className="text-center">Days</TableHead>
                                  <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {rental.value.items.map((car: CarData) => (
                                  <TableRow key={car._id}>
                                    <TableCell>{car.title}</TableCell>
                                    <TableCell className="text-center">
                                      <FormattedPrice amount={car.price} />
                                    </TableCell>
                                    <TableCell className="text-center">{car.quantity} days</TableCell>
                                    <TableCell className="text-right font-semibold">
                                      <FormattedPrice amount={car.price * car.quantity} />
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            ))
          ) : (
            <p className="text-lg font-medium -mt-3">No active rentals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Rentals;
