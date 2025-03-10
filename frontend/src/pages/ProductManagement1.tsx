import Navbar from "../components/Navbar/Navbar";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import { useEffect, useState } from "react";
import useGetTableData, { Product } from "./useGetTableData";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { CircularProgress, Paper } from "@mui/material";
import { sampleData } from "../components/constant";




const ProductManagement = () => {
  const { fetchData, error, loading , tableData } = useGetTableData();
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);


  useEffect(() => { 
    console.log("Fetching Data");
    fetchData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const columns: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "cost_price", headerName: "Cost Price", type: "number", flex: 1 },
    { field: "selling_price", headerName: "Selling Price", type: "number", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "available_stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "units_sold", headerName: "Units Sold", type: "number", flex: 1 },
    { field: "customer_rating", headerName: "Rating", type: "number", flex: 1 },
    { field: "demand_forecast", headerName: "Forecast", type: "number", flex: 1 },
    { field: "optimized_price", headerName: "Optimized Price", type: "number", flex: 1 }
  ];
  const columnData=columns.filter((column:GridColDef)=>tableData?.products[0][column.field as keyof Product]);

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    fetchData({ skip: model.page * model.pageSize, limit: model.pageSize });
  };

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedData = (tableData?.products||[]).filter((row) => rowSelectionModel.includes(row.id));
    setSelectedRows(selectedData);
  };

  return (
    <div>
      <Navbar />
      <ControlPanel selectedRows={selectedRows}/>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={tableData?.products}
          columns={columnData}
          checkboxSelection
          onRowSelectionModelChange={(rowSelectionModel) => handleRowSelection(rowSelectionModel)}
          paginationMode="server"
          rowCount={tableData?.total || 0}
          pageSizeOptions={[10, 20, 50]}
          pagination
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          onPaginationModelChange={handlePaginationChange}
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
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductManagement;
