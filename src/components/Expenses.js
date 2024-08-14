import { useEffect, useState } from "react";
import { INCOME, EXPENSE } from "../shared/constants";
import ExpenseList from "./ExpenseList";
import useExpenses from "../hooks/useExpenses";
import Popup from "./Popup";

const Expenses = () => {
  const [editData, setEditData] = useState(null);
  const { getAllExpenses, deleteExpense, allExpenses, income, getAllIncome } =
    useExpenses();

  useEffect(() => {
    getAllExpenses();
    getAllIncome();
  }, [allExpenses, income]);

  const populateFormForEdit = (id, option) => {
    let array = option === INCOME ? income : allExpenses;
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
      <div className="income-list">
        <h3 className="table-heading">Income</h3>
        <hr />
        {income.length > 0 && (
          <ExpenseList
            expenses={income}
            option={INCOME}
            editExpense={populateFormForEdit}
            deleteExpense={deleteExpense}
          />
        )}
      </div>
      <div className="expenses-list">
        <h3 className="table-heading">Expenses</h3>
        <hr />
        {allExpenses.length > 0 && (
          <ExpenseList
            expenses={allExpenses}
            option={EXPENSE}
            editExpense={populateFormForEdit}
            deleteExpense={deleteExpense}
          />
        )}
      </div>
      {editData && <Popup editFormData={editData} onClose={onClose} />}
    </div>
  );
};

export default Expenses;
