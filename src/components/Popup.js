import { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import {
  INCOME,
  EXPENSE,
  expenseCategories,
  incomeCategories,
} from "../shared/constants";

const Popup = ({ onClose, editFormData }) => {
  const [option, setOption] = useState("");

  useEffect(() => {
    if (editFormData) {
      setOption(editFormData.type);
    }
  }, [editFormData]);

  const handleDropdownChange = (event) => {
    setOption(event.target.value);
  };

  const categories = option === EXPENSE ? expenseCategories : incomeCategories;

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h3 className="float-start">Add Income or Expense</h3>
          <button className="float-end btn" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="popup-options">
          <select
            className="form-control"
            value={option}
            onChange={handleDropdownChange}
          >
            <option value="">Choose one</option>
            <option value={EXPENSE}>Expense</option>
            <option value={INCOME}>Income</option>
          </select>
        </div>
        <div className="mt-5">
          {(option === INCOME || option === EXPENSE) && (
            <ExpenseForm
              categories={categories}
              value={option}
              editFormData={editFormData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
