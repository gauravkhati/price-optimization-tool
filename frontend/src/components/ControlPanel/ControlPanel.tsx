import { useState } from "react";
import AddProductPopup from "../AddProductPopup/AddProductPopup";
import style from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import arrowBack from '../../assets/icons/arrow_back.svg';
import SearchBar from "../SearchBar/SearchBar";
import AddIcon from '../../assets/icons/add_circle.svg';
import ForecastIcon from '../../assets/icons/forecast.svg';
import ForecastDemand from "../ForecastDemand/ForecastDemand";
import { Product } from "../../hooks/useGetTableData";

interface ControlPanelProps {
  selectedRows: Product[];
  dashboard: string;
}
const ControlPanel: React.FC<ControlPanelProps> = (props) => {
  const { selectedRows, dashboard } = props;
  console.log('dashboard', dashboard);
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate("/home");
  };
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openForcastDemand, setOpenForcastDemand] = useState(false);

  const handleOpenForcastDemand = () => {
    if (selectedRows.length === 0) {
      setError('Please select atleast one product');
      return;
    }
    setOpenForcastDemand(true);
  }

  const token = localStorage.getItem('accessToken');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).userRole : null;
  console.log(selectedRows, 'selectedRows');
  return (
    <div className={style['searchBarContainer']}>
      <div className={style['back-button']} onClick={navigateToHomePage}>
        <div className={style['back-icon']} >
          <img src={arrowBack} alt="back-icon"></img>
        </div>
        <h5>Back</h5>
      </div>
      <div className={style['vertical-line']}>

      </div>
      <div className={style['heading-container']}>
        <h1 className={style['dashboard-heading']}>
          {
            dashboard === 'product-management' ? 'Create and Manage Products' : 'Cost Optimization'
          }
        </h1>
        <div className={style['demand-forecast']}>
          DemandForecast
        </div>
      </div>
      <div className={style['vertical-line']} />
      <div className={style['search-bar-container']}>
        <SearchBar data={selectedRows}/>
      </div>
      <div className={style['vertical-line']} />
      {dashboard === 'product-management' &&
        <>
          <div className={style['add-product']}>

            <button className={style['add-product-button']} onClick={() => setOpen(true)}>
              <img src={AddIcon} alt="forecast-icon" />
              <p>Add Product</p>
            </button>
          </div>
          <div className={style['forecast-demand']}>
            {/* only accessible to admin */}
            <button
              className={`${style['add-product-button']} ${(userRole !== 'admin' || !selectedRows.length) ? style['disabled-button'] : ''}`}
              onClick={() => handleOpenForcastDemand()}
              disabled={(userRole !== 'admin' || !selectedRows.length)}
            >
              <img src={ForecastIcon} alt="forecast-icon" />
              <p>Forecast Demand</p>
            </button>
          </div>
        </>
      }
      <AddProductPopup open={open} onClose={() => setOpen(false)} />
      {
        selectedRows && selectedRows.length > 0 &&
        <ForecastDemand open={openForcastDemand} onClose={() => setOpenForcastDemand(false)} selectedData={selectedRows} />
      }
      {error && <div>{error}</div>}
    </div>


  )
}

export default ControlPanel
