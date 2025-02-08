"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Banner from "@/components/Banner";
import Facilities from "@/components/Facilities";
import HomeCarSection from "@/components/HomeCarSection";
import { getCarData } from "@/lib/getData";

const Home = () => {
  const [popularCars, setPopularCars] = useState([]);
  const [recommendedCars, setRecommendedCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carData = await getCarData();
        if (!carData || carData.length === 0) throw new Error("No cars found");

        const popular = carData.filter((car: { isPopular: unknown; }) => car.isPopular);
        const recommended = carData.filter((car: { isRecommended: unknown; }) => car.isRecommended);

        setPopularCars(popular.length ? popular : carData.slice(0, 6));
        setRecommendedCars(recommended.length ? recommended : carData.slice(6, 12));
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <Container className="py-10">
      <Banner />
      <HomeCarSection title="Popular Cars" viewAllLink="/category" cars={popularCars} />
      <HomeCarSection title="Recommended Cars" viewAllLink="/category" cars={recommendedCars} />
      <Facilities />
    </Container>
  );
};

export default Home;