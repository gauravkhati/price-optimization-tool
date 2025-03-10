
import style from './Navbar.module.css'
const Navbar = () => {
    const token = localStorage.getItem('accessToken') || '';
    let name = 'Guest';
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            name = payload.name || 'Guest';
        } catch (e) {
            console.error('Invalid token', e);
        }
    }
    return (
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
    )
}
export default Navbar;