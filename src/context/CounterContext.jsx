import { createContext, useState } from "react";

export const CounterContext = createContext();

export default function CounterContextProvider({ children }) {
  const [counter, setCounter] = useState(0);

  function handleCounter(value) {
    setCounter(value);
  }

  return (
    <CounterContext.Provider value={{ counter, handleCounter }}>
      {children}
    </CounterContext.Provider>
  );
}
