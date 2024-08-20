import React from "react";

const Total = ({ sum }) => {
  let sumArray = [
    {
      title: "Total Income",
      total: sum?.incomeSum,
      color: "#7fc7af",
    },
    {
      title: "Total Expenses",
      total: sum?.expensesSum,
      color: "#ff3d7f",
    },
  ];
  return (
    <div className="total-budget">
      {sumArray.map((element) => {
        return (
          <div className="total-amt" style={{ backgroundColor: element.color }}>
            {element.title}: Rs. {element.total}
          </div>
        );
      })}
    </div>
  );
};

export default Total;
