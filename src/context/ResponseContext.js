import { createContext, useRef, useContext } from "react";

const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const incomeResponse = useRef({});
  const expenseResponse = useRef({});

  return (
    <ResponseContext.Provider
      value={{
        incomeResponse,
        expenseResponse,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseContext = () => useContext(ResponseContext);
