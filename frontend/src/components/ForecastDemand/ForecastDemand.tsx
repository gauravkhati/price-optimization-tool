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
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#000",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: '1.125rem'
                },
        
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "black",
                  color: "white !important",
                },
                "& .MuiTablePagination-root, & .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  color: "white !important",
                },
                "& .MuiSvgIcon-root": {
                  color: "white !important", // For pagination icons
                },
                "& .MuiDataGrid-cell": {
                  color: "black",
                  borderBottom: "1px solid #440", // Light gray border
                },
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "white", 
                },
                "& .MuiDataGrid-row:nth-of-type(even)": {
                  backgroundColor: "#c9c3c3",
                },
                "& .MuiDataGrid-columnHeaderCheckbox": {
                  color: '#440 !important',
                  backgroundColor: "black"
                },
                "& .MuiCheckbox-root .MuiSvgIcon-root": {
                  border: "1px solid #c9c3c3 !important", 
                  borderRadius: "4px", 
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
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "inherit !important", // Prevent hover effect
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
