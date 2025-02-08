import { Rule } from "sanity"; // ✅ Corrected Import

const carSchema = {
  name: "car",
  type: "document",
  title: "Car",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Car Name",
      validation: (Rule: Rule) => Rule.required().min(3).max(100),
    },
    {
      name: "brand",
      type: "string",
      title: "Brand",
      description: "E.g., Nissan, Tesla, etc.",
      validation: (Rule: Rule) => Rule.required().min(2).max(50),
    },
    {
      name: "type",
      type: "string",
      title: "Car Type",
      description: "E.g., Sport, Sedan, SUV, etc.",
      validation: (Rule: Rule) => Rule.required().min(3).max(30),
    },
    {
      name: "fuelCapacity",
      type: "string",
      title: "Fuel Capacity",
      description: "E.g., 90L, 100kWh",
      validation: (Rule: Rule) =>
        Rule.required()
          .regex(/^\d+(L|kWh)$/, { name: "fuel format" })
          .error("Must be in format: '90L' or '100kWh'"),
    },
    {
      name: "transmission",
      type: "string",
      title: "Transmission",
      description: "E.g., Manual, Automatic",
      validation: (Rule: Rule) => Rule.required().min(3).max(20),
    },
    {
      name: "seatingCapacity",
      type: "string",
      title: "Seating Capacity",
      description: "E.g., 2 People, 4 seats",
      validation: (Rule: Rule) =>
        Rule.required()
          .regex(/^\d+\s(seats|People)$/, { name: "seating format" })
          .error("Must be in format: '2 People' or '4 seats'"),
    },
    {
      name: "pricePerDay",
      type: "number", // ✅ Changed to number
      title: "Price Per Day",
      description: "Rental price per day in USD",
      validation: (Rule: Rule) =>
        Rule.required()
          .positive()
          .precision(2)
          .error("Price must be a valid positive number, e.g., 25.50"),
    },
    {
      name: "originalPrice",
      type: "number", // ✅ Changed to number
      title: "Original Price",
      description: "Original price before discount (if applicable)",
      validation: (Rule: Rule) =>
        Rule.optional()
          .positive()
          .precision(2)
          .error("Must be a valid positive number, e.g., 100.00"),
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "E.g., popular, recommended (max 5)",
      validation: (Rule: Rule) => Rule.unique().max(5).error("Max 5 tags allowed"),
    },
    {
      name: "image",
      type: "image",
      title: "Car Image",
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required().error("Car image is required"),
    },
  ],
};

export default carSchema;
