"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BannerData } from "../../types";
import { getBannersData } from "@/lib/getData";
import { urlFor } from "@/sanity/lib/image";
import Button from "./Button";

const Banner = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const maxDots = 5; // Max 5 dots

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannersData();
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data.slice(0, 10)); // Ensure max 10 banners
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    if (!isPaused && banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 3000); // Change every 3 seconds

      return () => clearInterval(interval);
    }
  }, [banners, isPaused]);

  if (!banners.length) {
    return <p className="text-center">No banners available.</p>;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div
      className="relative w-full h-[200px] md:h-[400px] flex items-center justify-center overflow-hidden rounded-lg bg-gray-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex w-full h-full">
        {/* Left Half - Text Content */}
        <div className="w-1/2 flex flex-col justify-center items-start px-10">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            {currentBanner?.title || "Welcome to GoRent Wheels"}
          </h2>
          <p className="text-lg md:text-xl mt-2 text-gray-700">
            {currentBanner?.subtitle || "Find the best rental cars now!"}
          </p>
          <p className="text-gray-600 text-sm md:text-md mt-2 max-w-lg">
            {currentBanner?.description || "Explore our premium car rentals at the best prices."}
          </p>
          {/* Rent Now Button */}
          <Button className="mt-5 px-6 py-3 text-lg bg-darkViolet text-white hover:bg-purple-700 transition-all duration-300">
            Rent Now
          </Button>
        </div>

        {/* Right Half - Car Image */}
        <div className="w-1/2 flex justify-center items-center">
          {currentBanner?.image && (
            <Image
              src={urlFor(currentBanner.image)?.url() || "/default-car.jpg"}
              alt={currentBanner?.title || "Car Image"}
              width={400}
              height={400}
              className="object-contain max-h-[90%] w-auto"
              priority
            />
          )}
        </div>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {Array.from({ length: Math.min(banners.length, maxDots) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-darkViolet scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;