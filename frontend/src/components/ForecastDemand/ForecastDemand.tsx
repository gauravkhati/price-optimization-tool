import { Dialog } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { sampleData } from "../constant";
import style from "./ForecastDemand.module.css";
import { Product } from "../../pages/useGetTableData";
import DemandForecastChart from "../DemandForecastChart/DemandForecastChart";
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
  { field: "demand_forecast", headerName: "Calculated Demand Forecast", type: "number", flex: 1 },
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
                backgroundColor: "#000", // Black background
                color: "#FFF", // White text
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1A1A1A", // Dark header
                  color: "black",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-cell": {
                  color: "#FFF",
                  borderBottom: "1px solid #444", // Light gray border
                },
                "& .MuiCheckbox-root": {
                  color: "#0fdfb7 !important", // Checkbox color
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#1A1A1A", // Footer background
                  color: "#FFF",
                },
                "& .MuiButton-root": {
                  color: "#0fdfb7", // Custom button color
                },
                "& .MuiSvgIcon-root": {
                  color: "#FFF", // Icons color
                },
                "& .MuiTablePagination-root": {
                  color: "#FFF",
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
