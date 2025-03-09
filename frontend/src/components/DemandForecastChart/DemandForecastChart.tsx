
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DemandForecastChart = ({ data }: { data: any }) => {
    console.log(data.rowData);
  const labels =data.rowData.map((item: any) => item.name);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Product Demand",
        data: data.rowData.map((item: any) => item.demand_forecast),
        borderColor: "purple",
        backgroundColor: "black",
      },
      {
        label: "Selling Price",
        data: data.rowData.map((item: any) => item.selling_price),
        borderColor: "cyan",
        backgroundColor: "rgba(0,255,255,0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    // plugins: { legend: true },
    scales: { y: { beginAtZero: true } },
  };
  if(chartData)return <Line data={chartData} options={options} />;
  return null;
};

export default DemandForecastChart;
