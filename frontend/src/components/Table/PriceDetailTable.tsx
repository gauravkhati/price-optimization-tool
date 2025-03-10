import styles from './Table.module.css';
interface TableRow {
    id: number;
    name: string;
    description: string;
    cost_price: number;
    selling_price: number;
    category: string;
    available_stock: number;
    units_sold: number;
    customer_rating: number;
    demand_forecast: number;
    optimized_price: number;

}
interface TableProps {
    data: {
      rowData : TableRow[];
    }
  }
  
  const PriceDetailTable: React.FC<TableProps> = ( props ) => {
    const { data  } = props ;

    const columnHeader=Object.keys(data.rowData[0]).filter((key)=>key!=='id');
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.normalProgramTitle}  colSpan={-1}></th>
              {/* <th className={styles.capTitle} scope="col">CAP</th>
              <th className={styles.normalProgramTitle}>Cost Price</th>  */}
              {
                columnHeader.map((column,index)=>(
                  <th key={index} className={styles.normalProgramTitle}>{column}</th>
                ))
              }

            </tr>
          </thead>
          <tbody>
          
            {data.rowData.map((row, index) => (
              <tr key={index}>
                <td className={styles.label}>{`select`}</td>
                {columnHeader.map((column,index)=>(
                  <td key={index} className={styles.normalProgram}>{row[column as keyof TableRow]}</td>
                ))
                  }
                {/* <td className={styles.normalProgram}>{row.name}</td>
                <td className={styles.capValue}>{row.description}</td>
                <td className={styles.normalProgram}>{row.cost_price}</td>
                <td className={styles.normalProgram}>{row.selling_price}</td>
                <td className={styles.normalProgram}>{row.category}</td>
                <td className={styles.normalProgram}>{row.available_stock}</td>
                <td className={styles.normalProgram}>{row.units_sold}</td>
                <td className={styles.normalProgram}>{row.customer_rating}</td>
                <td className={styles.normalProgram}>{row.demand_forecast}</td>
                <td className={styles.capValue}>{row.optimized_price}</td> */}
              </tr>
            ))}
            {/* <tr>
              <td className={styles.footer} colSpan={columnHeader.length+1}>
                <div className={styles.textContainer}>
                  <div className={styles.savingsLabel}>Average Savings</div>
                  <div className={styles.savingsValue}>123</div>
                </div>
                <div className={styles.starText}>* all numbers represented are averages</div>
              </td>
            </tr> */}
          </tbody>
        </table>
  
      </div>
    );
  };
  
  export default PriceDetailTable;
  