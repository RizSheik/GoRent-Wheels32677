import Container from "@/components/Container";
import { groq } from "next-sanity";
import { CarData } from "@/types";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import CarInfo from "@/components/CarInfo";
import { getCarData } from "@/lib/getData";
import CarCard from "@/components/CarCard";

interface Props {
  params: { slug: string };
}

const SingleCarPage = async ({ params: { slug } }: Props) => {
  try {
    // Fetch the specific car data
    const query = groq`*[_type == "car" && slug.current == $slug][0]`;
    const car: CarData | null = await client.fetch(query, { slug });

    if (!car) {
      return (
        <Container className="my-10 bg-bgLight text-center">
          <h2 className="text-2xl font-bold text-red-500">Car not found</h2>
          <p>Please check the car listing and try again.</p>
        </Container>
      );
    }

    // Fetch all cars to filter related cars
    const relatedCars: CarData[] = await getCarData();
    const filteredRelatedCars = relatedCars
      .filter((item) => item.slug?.current !== slug)
      .slice(0, 4); // Show only 4 related cars

    return (
      <Container className="my-10 bg-bgLight">
        {/* Display Car Image with proper type safety */}
        <div className="w-full flex justify-center">
          <Image
            src={
              typeof car.image?.asset?.url === "string"
                ? car.image.asset.url
                : "/placeholder-image.jpg"
            }
            alt={car.name || "Car Image"}
            width={500}
            height={300}
            className="rounded-lg object-cover"
            priority
          />
        </div>

        {/* Car Details */}
        <CarInfo product={car} />

        {/* Related Cars Section */}
        <h2 className="text-2xl font-bold text-center my-6">Related Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredRelatedCars.length > 0 ? (
            filteredRelatedCars.map((item) => (
              <CarCard item={item} key={item._id} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No related cars available.
            </p>
          )}
        </div>
      </Container>
    );
  } catch (error) {
    console.error("Error fetching car data:", error);
    return (
      <Container className="my-10 bg-bgLight text-center">
        <h2 className="text-2xl font-bold text-red-500">
          Something went wrong
        </h2>
        <p>
          There was an error loading the car details. Please try again later.
        </p>
      </Container>
    );
  }
};

export default SingleCarPage;
