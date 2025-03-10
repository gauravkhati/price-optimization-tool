import { useState } from "react";
import AddProductPopup from "../components/AddProductPopup/AddProductPopup";
import Navbar from "../components/Navbar/Navbar";
import PriceDetailTable from "../components/Table/PriceDetailTable";
import { tableData } from "../components/Table/constants";

const PricingOptimization = () => {
    return (
      <div className="p-10">
        <Navbar/>
      </div>
    );
  };
  
  export default PricingOptimization;
  