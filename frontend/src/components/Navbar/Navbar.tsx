
import style from './Navbar.module.css'
const Navbar=()=>{
    const token=localStorage.getItem('accessToken')||'';
    const { name } = JSON.parse(atob(token.split(".")[1])); 
    return(
        <>
        <div className={style['navbar-container']}>
            <h1 className={style['title']}>
                Price Optimisation Tool
            </h1>
            <div className={style['profileName']}>
            <p className={style['welcome']}>
               Welcome,
            </p>
            <p className={style['account']}> {name.toUpperCase()}
            </p>
            </div>
        </div>
        </>
    )
}
export default Navbar;