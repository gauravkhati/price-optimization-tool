
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
 import style from './DemandForecasrChart.module.css';
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
        backgroundColor: "rgba(128,0,128,0.2)",
        borderWidth: 2,
        pointBackgroundColor: "purple",
        pointBorderColor: "white",
        tension: 0.4, 
      },
      {
        label: "Selling Price",
        data: data.rowData.map((item: any) => item.selling_price),
        borderColor: "cyan",
        backgroundColor: "rgba(0,255,255,0.2)", 
        borderWidth: 2,
        pointBackgroundColor: "cyan",
        pointBorderColor: "black",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { 
      y: { 
        beginAtZero: true, 
        grid: { color: "rgba(255,255,255,0.2)" },
        ticks: { color: "white" } 
      },
      x: {
        grid: { color: "rgba(255,255,255,0.2)" },
        ticks: { color: "white" }
      },
    },
    plugins: {
      legend: { 
        labels: { color: "white" }
      }
    }
  };
  if(chartData)return <Line className={style['chart-canvas']}data={chartData} options={options} />;
  return null;
};

export default DemandForecastChart;
