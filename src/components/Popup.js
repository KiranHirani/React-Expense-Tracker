import { useEffect, useRef, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { INCOME, EXPENSE } from "../shared/constants";

const Popup = ({ onClose, editFormData }) => {
  const [option, setOption] = useState("");
  let editType = useRef("");
  let popupDropdown = useRef("none");
  const setDropdownValue = (event) => {
    let value = event.target.value;
    setOption(value);
  };

  useEffect(() => {
    if (editFormData) {
      editType.current = editFormData.type;
      popupDropdown.current.value = editFormData.type;
      setOption(editFormData.type);
    }
  }, [editFormData]);

  let expenseCategories = ["Food", "Leisure"],
    incomeCategories = ["Salary", "Bonus"];

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
            ref={popupDropdown}
            onChange={(event) => setDropdownValue(event)}
          >
            <option value="none">Choose one</option>
            <option value={EXPENSE}>Expense</option>
            <option value={INCOME}>Income</option>
          </select>
        </div>
        <div className="mt-5">
          {option === INCOME || option === EXPENSE ? (
            <ExpenseForm
              categories={categories}
              value={option}
              editFormData={editFormData}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Popup;
