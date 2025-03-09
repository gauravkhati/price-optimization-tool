import Navbar from "../components/Navbar/Navbar";
import PriceDetailTable from "../components/Table/PriceDetailTable";
import { tableData } from "../components/Table/constants";

const PricingOptimization = () => {
    return (
      <div className="p-10">
        <Navbar/>
        <PriceDetailTable data={{rowData:tableData}}/>
      </div>
    );
  };
  
  export default PricingOptimization;
  