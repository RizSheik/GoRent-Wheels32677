import { CarData } from "@/types";
import Link from "next/link";
import CarCard from "./CarCard";

interface HomeCarSectionProps {
  title: string;
  viewAllLink: string;
  cars: CarData[];
}

const HomeCarSection: React.FC<HomeCarSectionProps> = ({ title, viewAllLink, cars }) => {
  if (cars.length === 0) return null; // Don't render if no cars are available

  return (
    <div className="my-10">
      {/* Section Header with Title and View All */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-darkViolet">{title}</h2>
        <Link href={viewAllLink} className="text-blue-500 hover:underline">
          View All →
        </Link>
      </div>

      {/* Car Grid - Show only 6 cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {cars.slice(0, 6).map((car) => (
          <CarCard key={car._id} item={car} />
        ))}
      </div>
    </div>
  );
};

export default HomeCarSection;