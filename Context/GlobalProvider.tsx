"use client";
import { useState, createContext, useContext, ReactNode, useMemo } from "react";
import useWeather from "@/Hooks/useWeather";
import { GlobalContextType } from "@/Types/GlobalContext";
interface GlobalContextProps {
  children: ReactNode;
}

const GlobalContext = createContext<GlobalContextType>(null!);

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }: GlobalContextProps) => {
  const { weatherData, loading, setLocation } = useWeather();
  const [menu, setMenu] = useState<string>("Dashboard");

  const contextValue = useMemo(
    () => ({ weatherData, loading, menu, setMenu, setLocation }),
    [weatherData, loading, menu, setLocation]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
