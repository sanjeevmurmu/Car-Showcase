"use client"
import { Hero, SearchBar, CustomFilter, CarCard, ShowMore } from '@/components'
import Image from 'next/image'
import { fetchCars, fetchOtherCarsTypes } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import { useEffect, useState,useContext } from 'react';
import {CarState} from '@/types'
import { SearchContext } from "@/context/SearchContext"



export default function Home() {

  // const allCars = await fetchCars({
  //   manufacturer: .manufacturer || " ",
  //   year: .year || 2022,
  //   fuel: .fuel || " ",
  //   limit: .limit || 10,
  //   model: .model || " ",
  // });
  const [allCars, setAllCars] = useState<CarState>([])
  const [loading, setLoading] = useState(true)

  const [manufacturer, setManufacturer] = useState(" ")
  const [model, setModel] = useState(" ")

  const [year, setYear] = useState(1900)
  const [fuel, setFuel] = useState(" ")

  const [limit, setLimit] = useState(10)

  const [carDetailClicked, setcarDetailClicked] = useState(false) // used in useeffect to control which function should be used to make the api call

  const {state} = useContext(SearchContext)
  console.log(state)

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || " ",
        year:year||2022,
        fuel: fuel || " ",
        model: model || " ",
      },limit)
      setAllCars(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const getOtherCars = async () => {
    setLoading(true)
    try {
      const result = await fetchOtherCarsTypes(state,limit)
      setAllCars(result)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  
  
 

  useEffect(() => {
    console.log(fuel,year,limit,model,manufacturer)
    if(carDetailClicked){
        getOtherCars()
        setcarDetailClicked(false)
    }
    else{
      getCars()
    }

  }, [fuel, year, limit, model, manufacturer,state])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id="discover"><div className='home__text-container'><h1 className='text-4xl font-extrabold'>Car Catalogue</h1><p>Explore the cars you might like</p></div>
        <div className='home__filters'><SearchBar setManufactruer={setManufacturer} setModel={setModel} /><div className='home__filter-container'>
          <CustomFilter title="fuel" options={fuels} setFilter={setFuel} />
          <CustomFilter title="year" options={yearsOfProduction} setFilter={setYear} />
        </div></div>
      
        {(allCars.length > 0 || loading) ? (<section><div className='home__cars-wrapper'>{allCars?.map((car,index) => (<CarCard key={`car-${index}`} car={car} index={index} setcarDetailClicked={setcarDetailClicked}/>))}</div>{loading &&(<div className='mt-16 w-full flex-center'><Image src="/loader.svg" alt="loader" width={200} height={200} className='object-contain'/></div>)}<ShowMore pageNumber={limit / 10} isNext={limit > allCars.length} setLimit={setLimit} /></section>) : (<div className='home__error-container'> <h2 className='text-black-text-xl font-bold'>Oops no results</h2><p>{allCars?.message}</p> </div>)}
      </div>
    </main>
  )
}
