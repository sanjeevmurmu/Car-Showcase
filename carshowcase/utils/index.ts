import { CarProps,FilterProps, OtherCarTypesProps } from "@/types";

export async function fetchCars(filters:FilterProps,limit){
  const {manufacturer,year,model,fuel}=filters
  console.log(filters)
    const headers= {
		'X-RapidAPI-Key': '5b6cbad58cmsh3c7b3f1c3f57b9dp160a50jsnb4a26025a3ae',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    let url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&model=${model}&limit=${limit}&fuel_type=${fuel}`;
    
    if (year!=1900){
      let urlArray= url.split("&limit")
      urlArray[1]=`&year=${year}&limit`+urlArray[1]
      url=urlArray.join('')
    }
    console.log(url);
    const response = await fetch(url, { headers: headers });
  

    const result=await response.json();
    console.log(result)
    return result
}


export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Get the current URL search params
  const searchParams = new URLSearchParams(window.location.search);

  // Set the specified search parameter to the given value
  searchParams.set(type, value);

  // Set the specified search parameter to the given value
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};


export const generateCarImageUrl=(car:CarProps,angle?:string)=>{
  const url=new URL('https://cdn.imagin.studio/getimage');
  const {make,year,model} =car;
  url.searchParams.append('customer','hrjavascript-mastery') 
  url.searchParams.append('make',make)
  url.searchParams.append('modelFamily',model.split(' ')[0])
  url.searchParams.append('zoomType','fullscreen')
  url.searchParams.append('modelYear',`${year}`)
  url.searchParams.append('angle',`${angle}`)

  return `${url}`
}

export async function fetchOtherCarsTypes(state,limit){
  
  const queryParams = Object.entries(state)
  .filter(([key, value]) => value !== "" && !Number.isNaN(value))
  .map(([key, value]) => `${key}=${value}`);

// Append the query parameters to the URL



    const headers= {
		'X-RapidAPI-Key': '5b6cbad58cmsh3c7b3f1c3f57b9dp160a50jsnb4a26025a3ae',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}
    let url=`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.join("&")}`
    
  
    url+=`&limit=${limit}`
    const response = await fetch(url,{headers:headers,});
    console.log(url)
    const result=await response.json();
    console.log(result)
  
    return result
}

import { useState, useEffect } from "react";

const useSessionStorage = (name) => {
  const [value, setValue] = useState({});
  useEffect(() => {
    const str = sessionStorage.getItem(name);
    if (str) {
      setValue(JSON.parse(str));
    }
  }, []);
  return value;
};

export default useSessionStorage;

