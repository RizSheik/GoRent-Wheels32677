"use client";

import React, { useEffect, useState } from "react";
import { getCarData } from "@/lib/getData";
import CarCard from "./CarCard";
import { CarData } from "@/types";

const CarList = () => {
  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCarData();
        setCars(data);
      } catch (err) {
        console.error("Error fetching car data:", err);
        setError("Failed to load car listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading cars...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {cars.length > 0 ? (
        cars.map((item) => <CarCard item={item} key={item._id} />)
      ) : (
        <div className="col-span-full text-center text-gray-600 font-semibold">
          No cars available at the moment.
        </div>
      )}
    </div>
  );
};

export default CarList;