import { createContext, useRef, useContext, useState } from "react";

const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const incomeResponse = useRef({});
  const expenseResponse = useRef({});
  const [incomeArray, setIncomeArray] = useState([]);
  const [expensesArray, setExpensesArray] = useState([]);

  return (
    <ResponseContext.Provider
      value={{
        incomeResponse,
        expenseResponse,
        setIncomeArray,
        incomeArray,
        expensesArray,
        setExpensesArray,
      }}
    >
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponseContext = () => useContext(ResponseContext);
