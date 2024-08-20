const ListSection = ({
  expenses,
  editExpense,
  deleteExpense,
  option,
  title,
}) => {
  return (
    <div>
      <h3 className="table-heading">{title}</h3>
      <table className="table table-condensed table-hover">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {expenses?.map((expense) => {
            return (
              <tr key={expense.id}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>Rs. {expense.amount}</td>
                <td>{expense.category}</td>
                <td className="action">
                  <i
                    className="fa-solid fa-pen-to-square me-3"
                    onClick={() => editExpense(expense.id, option)}
                  ></i>

                  <i
                    className="fa-solid fa-trash-can"
                    onClick={() => deleteExpense(expense.id, option)}
                  ></i>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListSection;
