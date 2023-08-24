'use client'
import useSessionStorage, { generateCarImageUrl } from '@/utils'
import Image from 'next/image'
import { Footer,Navbar } from '@/components'
import '@/app/globals.css'
import { useState } from 'react'

import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";


const Booking = () => {
    let car=(useSessionStorage('car'))
    const carImage=[]
    
        try {
          const result = generateCarImageUrl(car)
          carImage.push(result)
          console.log(carImage)
        } catch (error) {
          console.log(error)
        } 

      const [openDate, setOpenDate] = useState(false)
      const [dates, setDates] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ])

    return (
      <>
        <Navbar/>
      <div className='flex pt-[60px] pl-[20px]'>
             <div className='relative w-[330px] h-80 bg-pattern bg-cover bg-center rounded-lg m-5'>
             <Image src={carImage[0]} alt='car-image'fill priority className='object-contain'></Image>
             </div>
             <div className=' flex flex-col'>
            <h1 className='font-semibold text-3xl capitalize mt-6 mb-2 px-4'>{car.make}</h1>             
            <h2 className='font-semibold text-4xl capitalize px-4'>{car.model}</h2>     
            <div className="w-fit h-max ml-[10px] p-4 mt-6 border-solid border-2 border-indigo-600">
                <span
                  onClick={() => {setOpenDate(!openDate)}}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {setDates([item.selection])}}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="absolute z-2"
                    minDate={new Date()}
                    
                  />
                )}
              </div>
             </div>

            </div>
  
      <Footer/>
      </>
     )
}

export default Booking