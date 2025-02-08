import { client } from "@/sanity/lib/client"; 
import { bannerQuery, carQuery } from "@/lib/index"; 


export const revalidate = 0;


const getBannersData = async () => {
  try {
   
    const banners = await client.fetch(bannerQuery);
    return banners; 
  } catch (error) {
    console.error("Error fetching banners:", error);
    return []; 
  }
};


const getCarData = async () => {
  try {
    
    const cars = await client.fetch(carQuery);
    return cars; 
  } catch (error) {
    console.error("Error fetching cars:", error); 
    return []; 
  }
};


export { getBannersData, getCarData };
