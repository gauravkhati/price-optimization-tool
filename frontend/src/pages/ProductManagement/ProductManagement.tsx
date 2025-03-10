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
            "& .MuiDataGrid-cell": {
              backgroundColor: 'white',
              color: 'black',
              borderBottom: "1px solid #444",
            },
            "& .MuiDataGrid-columnHeaderCheckbox": {
              color: 'black',
              backgroundColor: "white"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: 'white',
              color: "black",
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
      {error && <div>{error}</div>}
    </div>
  );
};

export default ProductManagement;
