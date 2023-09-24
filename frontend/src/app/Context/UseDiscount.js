import { createContext, useContext } from "react";

export const DiscountContext = createContext();

export const useDiscount = () => {
  const price = useContext(DiscountContext);
  return price;
};
