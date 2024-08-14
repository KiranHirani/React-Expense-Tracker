import React, { useEffect, useRef } from "react";
import useExpenses from "../hooks/useExpenses";

const ExpenseForm = ({ categories, value, editFormData }) => {
  let formData = useRef({});
  const { addExpense, startEditExpense } = useExpenses();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let { description, moneySpent, date, categories } = event.target;
    if (description.value == "" || moneySpent.value == "") {
      alert("Description and amount are required fields");
    } else {
      let expenseData = {
        description: description.value,
        amount: moneySpent.value,
        date: date.value || new Date().toISOString().slice(0, 10),
        category: categories.value,
      };
      addExpense(expenseData, value);
    }
    event.target.reset();
  };

  useEffect(() => {
    if (editFormData) {
      let { description, moneySpent, date, categories } = formData.current;
      description.value = editFormData.description;
      moneySpent.value = editFormData.amount;
      date.value = editFormData.date;
      categories.value = editFormData.category;
      startEditExpense(editFormData.id);
    }
  }, [editFormData]);

  return (
    <div className="input-expenses">
      <form
        className="form-group"
        ref={formData}
        onSubmit={(event) => handleFormSubmit(event)}
      >
        <input
          type="text"
          placeholder="Description"
          className="description form-control m-1"
          name="description"
          required
        />
        <input
          type="number"
          className="money-spent form-control m-1"
          name="moneySpent"
          placeholder="Amount"
          required
        />
        <input type="date" className="form-control m-1" name="date" />

        <select name="categories" className="form-control m-1">
          <option>None</option>
          {categories.map((category, index) => (
            <option key={category + index}>{category}</option>
          ))}
        </select>
        <button
          type="submit"
          className={
            editFormData ? "btn m-1 btn-secondary" : "btn m-1 btn-primary"
          }
        >
          {editFormData ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
