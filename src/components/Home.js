import { useEffect } from "react";
import useExpenses from "../hooks/useExpenses";
import PieChart from "./PieChart";
import GridDashboard from "./GridDashboard";
import Total from "./Total";

const Home = () => {
  const { getAllExpenses, expensesArray, incomeArray, getAllIncome } =
    useExpenses();
  let incomeSum = 0,
    expensesSum = 0;

  useEffect(() => {
    getAllExpenses();
    getAllIncome();
  }, []);

  const getSum = (array) => {
    let sum = array.reduce((acc, element) => {
      acc += parseInt(element.amount);
      return acc;
    }, 0);
    return sum;
  };

  if (incomeArray.length > 0) {
    incomeSum = getSum(incomeArray);
    expensesSum = getSum(expensesArray);
  }

  return (
    <div className="home-page">
      <Total sum={{ incomeSum, expensesSum }} />
      <section className="pie-chart">
        {incomeArray.length > 0 && <PieChart array={incomeArray} />}
        {expensesArray.length > 0 && incomeArray.length > 0 && (
          <PieChart array={expensesArray} sum={{ incomeSum, expensesSum }} />
        )}
      </section>
      {expensesArray.length > 0 && incomeArray.length > 0 && (
        <GridDashboard
          incomeArray={incomeArray}
          expensesArray={expensesArray}
        />
      )}
    </div>
  );
};

export default Home;
