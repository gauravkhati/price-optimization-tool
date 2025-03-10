import Navbar from "../components/Navbar/Navbar";
import PriceDetailTable from "../components/Table/PriceDetailTable";
// import { tableData } from "../components/Table/constants";
import style from './Prod.module.css';
import arrowBack from '../assets/icons/arrow_back.svg';
import DemandForecastChart from "../components/DemandForecastChart/DemandForecastChart";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGetTableData from "./useGetTableData";
import AddProductPopup from "../components/AddProductPopup/AddProductPopup";
import ControlPanel from "../components/ControlPanel/ControlPanel";


const ProductManagement = () => {
  const { fetchData, error, loading, tableData } = useGetTableData();

  useEffect(() => {
    console.log('Fetching Data');
    fetchData({});
  }, []);

  return (
    <div className="container">
      <Navbar />
      <ControlPanel data={{ rowData: tableData.products }}/>
      {!loading && tableData && tableData.products &&
        <div className={style['table-container']}>
          <PriceDetailTable data={{ rowData: tableData.products }} />
        </div>
      }
      {/* <div className={style['demand-forecast-container']}>
          <DemandForecastChart data={{rowData:tableData}}/>
          </div> */}
      {error && <div>{error}</div>}
     
    </div>

  );
};

export default ProductManagement;
