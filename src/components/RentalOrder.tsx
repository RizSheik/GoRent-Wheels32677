"use client";
import { db } from "@/firebase";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import FormattedPrice from "./FormattedPrice";
import { CarData } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Table, {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";

interface RentalOrder {
  id: string;
  value: {
    amount: number;
    items: CarData[];
  };
}

const RentalOrders = () => {
  const { data: session } = useSession();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Toggle order details
  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  // Fetch rental orders from Firestore
  const [ordersSnapshot, loading] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email as string, "rentals"))
  );

  const rentalOrders = ordersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as RentalOrder[];

  // Handle delete rental order
  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, "users", session?.user?.email as string, "rentals", id)
      );
      toast.success("Rental record deleted successfully.");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast.error("An error occurred while deleting the order.");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-0 animate-pulse bg-gray-300"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {rentalOrders?.length ? (
            rentalOrders?.map((rental: RentalOrder) => (
              <div key={rental?.id}>
                <Card
                  className={
                    expandedOrderId === rental.id ? "border-darkViolet/30" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      Rental ID:{" "}
                      <span className="text-base tracking-wide">
                        {rental.id.slice(-10)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Total Rental Cost
                        </p>
                        <FormattedPrice
                          amount={rental?.value?.amount}
                          className="text-lg font-semibold"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          Payment Status
                        </p>
                        <Badge variant="success">Paid</Badge>
                      </div>
                      <Button onClick={() => toggleDetails(rental.id)}>
                        {expandedOrderId === rental.id
                          ? "Hide Details"
                          : "View Details"}
                      </Button>
                      <Button
                        onClick={() => handleDeleteOrder(rental?.id)}
                        variant="delete"
                      >
                        <MdClose className="text-base mt-1" /> Delete Rental
                      </Button>
                    </div>
                  </CardContent>

                  <AnimatePresence>
                    {expandedOrderId === rental.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 border-t rounded-none">
                          <CardHeader>
                            <CardTitle>Rented Cars</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Car</TableHead>
                                  <TableHead className="text-center">
                                    Price / Day
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Days
                                  </TableHead>
                                  <TableHead className="text-right">
                                    Total
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {rental?.value?.items?.map(
                                  (car: CarData) => (
                                    <TableRow key={car?._id}>
                                      <TableCell>{car?.title}</TableCell>
                                      <TableCell className="text-center">
                                        <FormattedPrice amount={car?.price} />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {car?.quantity}
                                      </TableCell>
                                      <TableCell className="text-right font-semibold">
                                        <FormattedPrice
                                          amount={car?.price * car?.quantity}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
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
            <div>
              <p className="text-lg font-medium -mt-3">
                No rental orders found.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RentalOrders;