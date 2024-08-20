import { Chart } from "react-google-charts";

const PieChart = ({ array, sum }) => {
  const options = { is3D: true };

  const transformedArray = array?.reduce((acc, element) => {
    const { category, amount } = element;
    acc[category] = (acc[category] || 0) + parseInt(amount, 10);
    return acc;
  }, {});

  const result = Object.entries(transformedArray);

  let savings = sum?.incomeSum - sum?.expensesSum;

  let data = [["Money", "Earnt or Spent"], ["Savings", savings], ...result];

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};

export default PieChart;
