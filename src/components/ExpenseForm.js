import { useEffect, useRef } from "react";
import useExpenses from "../hooks/useExpenses";

const ExpenseForm = ({ categories, value, editFormData }) => {
  const { addExpense, startEditExpense } = useExpenses();
  const formRef = useRef(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { description, moneySpent, date, categories } = event.target.elements;

    if (!description.value || !moneySpent.value) {
      alert("Description and amount are required fields");
      return;
    }

    const expenseData = {
      description: description.value,
      amount: moneySpent.value,
      date: date.value || new Date().toISOString().slice(0, 10),
      category: categories.value,
    };

    if (editFormData) {
      addExpense(expenseData, value, editFormData.id);
    } else {
      addExpense(expenseData, value);
    }

    event.target.reset();
  };

  useEffect(() => {
    if (editFormData) {
      const { description, amount, date, category } = editFormData;
      const form = formRef.current.elements;
      form.description.value = description;
      form.moneySpent.value = amount;
      form.date.value = date;
      form.categories.value = category;
      startEditExpense(editFormData.id);
    }
  }, [editFormData, startEditExpense]);

  return (
    <div className="input-expenses">
      <form className="form-group" ref={formRef} onSubmit={handleFormSubmit}>
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
          {categories.map((category, index) => (
            <option key={`${category}-${index}`} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className={`btn m-1 ${
            editFormData ? "btn-secondary" : "btn-primary"
          }`}
        >
          {editFormData ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
