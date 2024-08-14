import { useCallback, useState, useRef } from "react";
import { EXPENSES_URL, INCOME_URL, INCOME, EXPENSE } from "../shared/constants";
import { useResponseContext } from "../context/ResponseContext";

const useExpenses = () => {
  const [allExpenses, setAllExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [isEditMode, setEditMode] = useState(false);
  const { incomeResponse, expenseResponse } = useResponseContext();

  let editId = useRef(0);

  const addExpense = useCallback(
    (formValues, option) => {
      if (isEditMode) {
        if (option === EXPENSE) {
          setAllExpenses((prevExpenses) =>
            prevExpenses.map((exp) =>
              exp.id === editId.current ? { ...exp, ...formValues } : exp
            )
          );
        } else {
          setIncome((prevIncome) =>
            prevIncome.map((income) =>
              income.id === editId.current
                ? { ...income, ...formValues }
                : income
            )
          );
        }

        setEditMode(false);
        updateExpenseInDB(editId.current, formValues, option);
      } else {
        let data = { ...formValues, id: Date.now() };
        if (option === INCOME) {
          setIncome((prevIncome) => [...prevIncome, data]);
        } else {
          setAllExpenses((prevExpenses) => [...prevExpenses, data]);
        }
        saveExpenseInDB(data, option);
      }
    },
    [isEditMode]
  );

  const saveExpenseInDB = async (expenseData, option) => {
    let url = option === INCOME ? INCOME_URL : EXPENSES_URL;
    const response = await fetch(url + ".json", {
      method: "POST",
      body: JSON.stringify(expenseData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    showAlert(option);
  };

  const showAlert = (value) => {
    alert(value + " is added");
  };

  const updateExpenseInDB = async (id, expenseData, option) => {
    let key = getMappedKey(id, option);
    const url = option === INCOME ? INCOME_URL : EXPENSES_URL;

    if (key) {
      fetch(`${url}/${key}.json`, {
        method: "PUT",
        body: JSON.stringify(expenseData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  const getAllExpenses = async () => {
    const response = await fetch(EXPENSES_URL + ".json");
    const data = await response.json();
    expenseResponse.current = data;
    if (data) setAllExpenses(Object.values(data));
  };

  const getAllIncome = async () => {
    const response = await fetch(INCOME_URL + ".json");
    const data = await response.json();
    incomeResponse.current = data;
    if (data) setIncome(Object.values(data));
  };

  const deleteExpense = useCallback((id, option) => {
    if (option === INCOME) {
      setIncome((prevIncome) => prevIncome.filter((inc) => inc.id !== id));
    } else {
      setAllExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp.id !== id)
      );
    }
    deleteExpenseFromDB(id, option);
  }, []);

  const deleteExpenseFromDB = (id, option) => {
    let url = option == INCOME ? INCOME_URL : EXPENSES_URL;
    const key = getMappedKey(id, option);
    if (key) {
      fetch(`${url}/${key}.json`, {
        method: "DELETE",
      });
    }
  };

  const getMappedKey = (id, option) => {
    const { current } = option === INCOME ? incomeResponse : expenseResponse;
    for (let key in current) {
      if (current[key].id === id) return key;
    }
    return null;
  };

  const startEditExpense = useCallback((id) => {
    setEditMode(true);
    editId.current = id;
  }, []);

  return {
    startEditExpense,
    deleteExpense,
    getAllIncome,
    income,
    addExpense,
    getAllExpenses,
    allExpenses,
    setEditMode,
  };
};

export default useExpenses;
