import { Dialog } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { sampleData } from "../constant";
import style from "./ForecastDemand.module.css";
import DemandForecastChart from "../DemandForecastChart/DemandForecastChart";
import { Product } from "../../hooks/useGetTableData";
interface ForecastDemandProps {
  open: boolean;
  onClose: () => void;
  selectedData: Product[];
}
const columnData: GridColDef[] = [
  { field: "name", headerName: "Product Name", flex: 1 },
  { field: "cost_price", headerName: "Cost Price", type: "number", flex: 1 },
  { field: "selling_price", headerName: "Selling Price", type: "number", flex: 1 },
  { field: "available_stock", headerName: "Stock", type: "number", flex: 1 },
  { field: "units_sold", headerName: "Units Sold", type: "number", flex: 1 },
  { field: "demand_forecast", headerName: "Calculated Demand Forecast", type: "number", flex: 1, cellClassName: "highlight-column-width" },
];
const ForecastDemand: React.FC<ForecastDemandProps> = ({ open, onClose, selectedData }) => {
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#222323",
          color: "white"
        }
      }} >
        <div className={style["forecast-demand-container"]}>
          <div className={style['graph-container']}>

            <DemandForecastChart data={{ rowData: selectedData }} />

          </div>
          <div className={style['table-container']} >
            <DataGrid
              rows={selectedData}
              columns={columnData}
              rowCount={selectedData.length || 0}
              pageSizeOptions={[10, 20, 50]}
              getRowId={(row) => row.id}
              sx={{
                backgroundColor: "#000", 
                color: "#FFF", 
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1A1A1A",
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#1A1A1A",
                  color: "#FFF",
                },
                "& .MuiSvgIcon-root": {
                  color: "#FFF", 
                },
                "& .MuiTablePagination-root": {
                  color: "#FFF",
                },
                "& .highlight-column": {
                  color: "#0fdfb7 !important", 
                  fontWeight: "bold",
                },
                "& .highlight-column-width": {
                  color: "black !important", 
                  fontWeight: "bold",
                  backgroundColor: '#0fdfb7'
                },
              }}
            />
          </div>
        </div>

      </Dialog>


    </>
  )
}

export default ForecastDemand
