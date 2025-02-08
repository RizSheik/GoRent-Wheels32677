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
  const query = groq`*[_type == "car" && slug.current == $slug][0]`;
  const car: CarData | null = await client.fetch(query, { slug });
  const relatedCars: CarData[] = await getCarData();

  const filteredRelatedCars = relatedCars.filter((item) => item.slug.current !== slug);

  if (!car) {
    return (
      <Container className="my-10 bg-bgLight text-center">
        <h2 className="text-2xl font-bold text-red-500">Car not found</h2>
        <p>Please check the car listing and try again.</p>
      </Container>
    );
  }

  return (
    <Container className="my-10 bg-bgLight">
      <Image src={car.image?.asset?.url || "/placeholder-image.jpg"} alt="Car Image" width={500} height={500} priority />

      <CarInfo product={car} />

      <h2 className="text-2xl font-bold text-center my-6">Related Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredRelatedCars.map((item) => (
          <CarCard item={item} key={item._id} />
        ))}
      </div>
    </Container>
  );
};

export default SingleCarPage;