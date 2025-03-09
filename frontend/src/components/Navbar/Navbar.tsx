import style from './Navbar.module.css'
const Navbar=()=>{
    return(
        <>
        <div className={style['navbar-container']}>
            <h1 className={style['title']}>
                Price Optimisation Tool
            </h1>
            <div className={style['profileName']}>
            <p className={style['welcome']}>
               Welcome
            </p>
            <p className={style['account']}> Gaurav Khati
            </p>
            </div>
        </div>
        </>
    )
}
export default Navbar;