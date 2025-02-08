import { groq } from "next-sanity";

const bannerQuery = groq`*[_type == 'banner']{...}|order(_createdAt asc)`;

const carQuery = groq`*[_type == "car"]{
   _id,
   name,
   brand,
   type,
   fuelCapacity,
   transmission,
   seatingCapacity,
   pricePerDay,
   originalPrice,
   tags,
   image {
     asset -> { _id, url }
   }
 }|order(_createdAt asc)`;

export { bannerQuery, carQuery };