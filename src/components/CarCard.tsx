import { CarData } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { MdStar } from "react-icons/md";
import FormattedPrice from "./FormattedPrice";
import RentThisCarButton from "@/components/RentNowButton";

interface CarCardProps {
  item: CarData;
  className?: string;
}

const CarCard: React.FC<CarCardProps> = ({ item, className }) => {
  const ratings = Math.floor(item?.ratings || 0);

  return (
    <div className={`border border-gray-300 rounded-lg shadow-md flex flex-col items-center p-4 bg-white hover:shadow-lg transition-transform duration-300 ${className}`}>
      {/* Image Section */}
      <Link href={`/car/${item?.slug?.current}`}>
        <div className="relative w-[260px] h-[190px] flex items-center justify-center overflow-hidden rounded-md cursor-pointer">
          {item?.image ? (
            <Image
              src={urlFor(item.image)?.url() || "/placeholder-image.jpg"}
              alt={item?.title || "Car Image"}
              width={260}
              height={190}
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
        </div>
      </Link>

      {/* Car Details */}
      <div className="mt-4 flex flex-col items-center text-center">
        {/* Star Ratings */}
        <div className="flex items-center text-yellow-400">
          {Array.from({ length: 5 }).map((_, index) => (
            <MdStar key={index} className={`text-lg ${index + 1 <= ratings ? "text-[#fbbf24]" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="uppercase text-xs font-medium text-darkViolet">{item?.brand || "Brand"}</p>
        <h2 className="text-sm font-semibold text-accent truncate w-full">{item?.title || "Car Title"}</h2>

        <p className="text-gray-600 text-xs">
          {item?.type && `${item.type} | `}
          {item?.fuelCapacity && `${item.fuelCapacity}L Fuel | `}
          {item?.transmission && `${item.transmission} | `}
          {item?.seatingCapacity && `${item.seatingCapacity} Seats`}
        </p>

        {/* Price & Rent Button */}
        <div className="mt-3 flex items-center gap-2 text-darkViolet font-bold">
          <span>Rent:</span>
          <FormattedPrice amount={item?.pricePerDay || 0} /> / day
        </div>

        <RentThisCarButton car={item} className="mt-4 w-full" />
      </div>
    </div>
  );
};

export default CarCard;