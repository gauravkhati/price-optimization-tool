import Navbar from "../components/Navbar/Navbar";
import ControlPanel from "../components/ControlPanel/ControlPanel";
import { useEffect, useState } from "react";
import useGetTableData from "./useGetTableData";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import { sampleData } from "../components/constant";



const ProductManagement = () => {
  const { fetchData, error, loading } = useGetTableData();
  const [selectedRows, setSelectedRows] = useState<unknown[]>([]);

  const tableData = sampleData;

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

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    fetchData({ skip: model.page * model.pageSize, limit: model.pageSize });
  };

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedData = tableData.products.filter((row) => rowSelectionModel.includes(row.id));
    setSelectedRows(selectedData);
  };

  return (
    <div>
      <Navbar />
      <ControlPanel />
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tableData?.products}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(rowSelectionModel) => handleRowSelection(rowSelectionModel)}
          paginationMode="server"
          rowCount={tableData?.total || 0}
          pageSizeOptions={[10, 20, 50]}
          pagination
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          onPaginationModelChange={handlePaginationChange}
          getRowId={(row) => row.id}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductManagement;
