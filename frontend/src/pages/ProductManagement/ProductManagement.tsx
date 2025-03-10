import Navbar from "../../components/Navbar/Navbar";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import { useEffect, useState } from "react";
import useGetTableData, { Product } from "../../hooks/useGetTableData";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { sampleData } from "../../components/constant";
import styles from './ProductManagement.module.css';

interface ProductManagementProps {
  dashboard: string;
}

const ProductManagement: React.FC<ProductManagementProps> = (props) => {
  const { dashboard } = props;
  const { fetchData, error, loading, tableData } = useGetTableData();
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const columnsForProductManagement: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "cost_price", headerName: "Cost Price", type: "number", flex: 1 },
    { field: "selling_price", headerName: "Selling Price", type: "number", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "available_stock", headerName: "Stock", type: "number", flex: 1 },
    { field: "units_sold", headerName: "Units Sold", type: "number", flex: 1 },
  ];
  const columnsForCostOptimization: GridColDef[] = [
    { field: "name", headerName: "Product Name", flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    { field: "cost_price", headerName: "Cost Price", type: "number", flex: 1 },
    { field: "selling_price", headerName: "Selling Price", type: "number", flex: 1 },
    { field: "optimized_price", headerName: "Optimized Price", type: "number", flex: 1, cellClassName: "highlight-column" }
  ]
  useEffect(() => {
    console.log("Fetching Data");
    fetchData({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const columnData = (dashboard === 'product-management' ? columnsForProductManagement : columnsForCostOptimization).filter((column: GridColDef) => tableData?.products[0][column.field as keyof Product]);

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    fetchData({ skip: model.page * model.pageSize, limit: model.pageSize });
  };

  const handleRowSelection = (rowSelectionModel: GridRowSelectionModel) => {
    const selectedData = (tableData?.products || []).filter((row) => rowSelectionModel.includes(row.id));
    setSelectedRows(selectedData);
  };
  return (
    <div>
      <Navbar />
      <ControlPanel selectedRows={selectedRows} dashboard={dashboard} />
      <div className={styles['dataTableContainer']}>
        <DataGrid
          showCellVerticalBorder={false}
          showColumnVerticalBorder={false}
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
              color: "black"
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "#c9c3c3",
              color: "black"
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
              backgroundColor: "red", // Prevent hover effect
            },
          }}
        />
      </div>
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductManagement;
