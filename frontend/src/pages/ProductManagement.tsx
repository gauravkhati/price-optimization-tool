import Navbar from "../components/Navbar/Navbar";
import PriceDetailTable from "../components/Table/PriceDetailTable";
import { tableData } from "../components/Table/constants";
import style from './Prod.module.css';
import arrowBack from '../assets/icons/arrow_back.svg';
import DemandForecastChart from "../components/DemandForecastChart/DemandForecastChart";
import AddProductPopup from "../components/AddProductPopup/AddProductPopup";
import { Button } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";


const ProductManagement = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <Navbar />
      <div className={style['searchBarContainer']}>
        <div className={style['back-button']}>
          <div className={style['back-icon']}>
            <img src={arrowBack} alt="back-icon"></img>
          </div>
          <h5>Back</h5>
        </div>
        <div className={style['vertical-line']}>

        </div>
        <div className={style['heading-container']}>
          <h1 className={style['dashboard-heading']}>Create and Manage Product</h1>
          <div className={style['demand-forecast']}>
            DemandForecast
          </div>
        </div>
        <div className={style['vertical-line']}></div>
        <div>
          <Button startIcon={<Add />} variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add New Product
          </Button>
        </div>
      </div>
      <PriceDetailTable data={{ rowData: tableData }} />
      <div className={style['demand-forecast-container']}>
        <DemandForecastChart data={{ rowData: tableData }} />
      </div>
      <AddProductPopup open={open} onClose={() => setOpen(false)} />
    </div>

  );
};

export default ProductManagement;
