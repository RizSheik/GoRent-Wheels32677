import React from "react";
import Container from "@/components/Container";
import CarList from "@/components/CarList";

const CategoryPage: React.FC = () => {
  return (
    <Container className="py-10 px-4">
      <h2 className="text-2xl font-semibold mb-5 text-gray-900">
        All Available Cars:
      </h2>
      <CarList />
    </Container>
  );
};

export default CategoryPage;
