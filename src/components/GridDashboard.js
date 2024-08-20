import { useEffect, useState } from "react";
import { INCOME, EXPENSE } from "../shared/constants";
import ListSection from "./ListSection";
import useExpenses from "../hooks/useExpenses";
import Popup from "./Popup";

const GridDashboard = ({ incomeArray, expensesArray }) => {
  const [editData, setEditData] = useState(null);
  const {
    getAllExpenses,
    deleteExpense,
    // expensesArray,
    // incomeArray,
    getAllIncome,
  } = useExpenses();

  const sections = [
    { title: "Income", array: incomeArray, option: INCOME },
    { title: "Expenses", array: expensesArray, option: EXPENSE },
  ];

  // useEffect(() => {
  //   getAllExpenses();
  //   getAllIncome();
  // }, []);

  const populateFormForEdit = (id, option) => {
    let array = option === INCOME ? incomeArray : expensesArray;
    let expenseToBeEdited = array.find((element) => element.id == id);
    if (expenseToBeEdited) {
      expenseToBeEdited.type = option;
      setEditData(expenseToBeEdited);
    }
  };

  const onClose = () => {
    setEditData(null);
  };

  return (
    <div className="expenses">
      <div className="list">
        {incomeArray.length > 0 &&
          expensesArray.length > 0 &&
          sections.map(({ title, array, option }) => (
            <ListSection
              key={option}
              title={title}
              expenses={array}
              option={option}
              editExpense={populateFormForEdit}
              deleteExpense={deleteExpense}
            />
          ))}
      </div>
      {editData && <Popup editFormData={editData} onClose={onClose} />}
    </div>
  );
};

export default GridDashboard;
