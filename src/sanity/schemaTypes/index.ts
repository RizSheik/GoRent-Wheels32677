import { type SchemaTypeDefinition } from "sanity";
import banner from "../schemas/banner";
import car from "../schemas/car";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [banner, car],
};