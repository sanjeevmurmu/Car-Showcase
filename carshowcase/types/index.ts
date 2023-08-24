import { MouseEventHandler } from "react";

export interface CustomButtonProps{
    title:string;
    containerStyles?: string;
    handleClick?:MouseEventHandler<HTMLButtonElement>;
    btnType?:"button"|"submit";
    textStyles?:string;
    rightIcon?:string;
    isDisabled?:boolean
    href:string 
}

export type CarState = CarProps[] & { message?: string };

export interface SearhManufacturerProps {
    selected:string,
    setSelected:(manufacturer:string)=>void;
}

export interface CarProps{
    city_mpg:number;
    class:string;
    combination_mpg:number;
    cylinders:number;
    displacement:number;
    drive:string;
    fuel_type:string;
    highway_mpg:number;
    make:string;
    model:string;
    transmission:string;
    year:number;
}

export interface FilterProps{
    manufacturer:string;
    year:number;
    fuel:string;
    model:string;

}

export interface OptionProps{
    title:string;
    value:string;
}

export  interface CustomFilterProps<T>{
    title:string;
    options:OptionProps[];
    setFilter: (selected: T) => void;

}

export interface ShowMoreProps{
    pageNumber:number;
    isNext:boolean;
    setLimit: (limit: number) => void;

}


export interface OtherCarTypesProps{
    city_mpg:number;
    carClass:string;
    combination_mpg:number;
    cylinders:number;
    drive:string;
    transmission:string;
    year:Number
}