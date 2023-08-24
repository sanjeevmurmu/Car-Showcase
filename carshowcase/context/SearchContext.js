"use client"

import { createContext, useReducer } from "react";
const otherCarProperties={
  city_mpg:NaN,
  class:"",
  combination_mpg:NaN,
  cylinders:NaN,
  drive:"",
  transmission:"",
  year:NaN
}


export const SearchContext = createContext(otherCarProperties);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return {
        ...state,
        ...action.payload,
      };
    case "RESET_SEARCH":
      return otherCarProperties;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {

  const [state, dispatch] = useReducer(SearchReducer, otherCarProperties);

  console.log(state)

  return (
    <SearchContext.Provider
      value={{
        // city_mpg:otherCarProperties.city_mpg,
        // combination_mpg:otherCarProperties.combination_mpg,
        // cylinders:otherCarProperties.cylinders,
        // drive:otherCarProperties.drive,
        // transmission:otherCarProperties.transmission,
        // carClass:otherCarProperties.class,
        // year:otherCarProperties.year,
        state,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};


















