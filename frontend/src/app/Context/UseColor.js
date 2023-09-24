import { createContext, useContext } from "react";

export const StatusContext = createContext();

export const useColor = () => {
  const color = useContext(StatusContext);
  return color;
};
