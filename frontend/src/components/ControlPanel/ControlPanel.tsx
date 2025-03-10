import { useState } from "react";
import AddProductPopup from "../AddProductPopup/AddProductPopup";
import style from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import arrowBack from '../../assets/icons/arrow_back.svg';
const ControlPanel: React.FC = () => {
  const navigate = useNavigate();
  const navigateToHomePage = () => {
    navigate("/home");
  };
  const [open, setOpen] = useState(false);

  const token = localStorage.getItem('token'); // Adjust based on your token storage method
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;
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
        <h1 className={style['dashboard-heading']}>Create and Manage Product</h1>
        <div className={style['demand-forecast']}>
          DemandForecast
        </div>
      </div>
      <div className={style['vertical-line']}></div>
      <div className={style['add-product']}>
        <button className={style['add-product-button']} onClick={() => setOpen(true)}>Add Product</button>
      </div>
      <div className={style['forecast-demand']}>
        //only accessible to admin
        <button
          className={style['add-product-button']}
          onClick={() => setOpen(true)}
          disabled={userRole !== ''}
        >
          Add Product
        </button>
      </div>
      <AddProductPopup open={open} onClose={() => setOpen(false)} />
    </div>


  )
}

export default ControlPanel
