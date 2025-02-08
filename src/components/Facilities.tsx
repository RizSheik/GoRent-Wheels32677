import React from "react";
import { FaCar, FaShieldAlt, FaHeadset, FaClock } from "react-icons/fa";

const facilitiesData = [
  {
    title: "Flexible Rentals",
    description: "Rent by day, week, or month",
    icon: <FaClock aria-hidden="true" />,
  },
  {
    title: "Comprehensive Insurance",
    description: "Drive worry-free with full coverage",
    icon: <FaShieldAlt aria-hidden="true" />,
  },
  {
    title: "24/7 Roadside Assistance",
    description: "Help is always a call away",
    icon: <FaHeadset aria-hidden="true" />,
  },
  {
    title: "Wide Selection of Cars",
    description: "Choose from economy to luxury",
    icon: <FaCar aria-hidden="true" />,
  },
];

const Facilities = () => {
  return (
    <section className="py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {facilitiesData.map(({ title, description, icon }) => (
        <div key={title} className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-3xl text-darkViolet">{icon}</span>
          <div className="text-center sm:text-left">
            <h2 className="uppercase font-semibold text-lg">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Facilities;