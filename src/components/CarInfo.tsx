"use client";
import { CarData } from "@/types";
import RentThisCarButton from "./RentNowButton";
import FormattedPrice from "./FormattedPrice";

interface CarInfoProps {
  product: CarData | null;
  isLoading?: boolean;
  error?: string;
  className?: string;
}

const CarInfo: React.FC<CarInfoProps> = ({ product, isLoading, error, className }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-md">
        <div className="animate-pulse bg-gray-300 h-8 w-36 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-6 w-28 rounded"></div>
        <div className="animate-pulse bg-gray-300 h-6 w-60 rounded"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 font-semibold">{error}</p>;
  }

  if (!product) {
    return <p className="text-gray-500">Car details are not available at the moment.</p>;
  }

  return (
    <div className={`flex flex-col gap-5 p-4 bg-white shadow-md rounded-lg ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900">{product?.title || "Car Name"}</h2>

      <div className="flex items-center gap-3">
        <FormattedPrice amount={product?.pricePerDay || 0} className="text-xl font-bold text-darkViolet" />
        <span className="text-gray-500 text-sm">/ per day</span>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {product?.description || "No description available."}
      </p>

      <RentThisCarButton car={product} className="rounded-md py-3 w-full bg-darkViolet text-white hover:bg-lightViolet transition duration-300" />
    </div>
  );
};

export default CarInfo;