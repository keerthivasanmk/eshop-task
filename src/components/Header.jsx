import { Link } from "react-router-dom";
import logo from '../images/logo.png';

export default function Header({ children }) {
    return (
        <div className="header">
            <Link to='/'>
                <img
                    src={logo}
                    alt='logo-icon'
                    height={40}
                />

            </Link>
            <div className="nav-menus">
                <Link to="/cart">Cart</Link>
                <Link to="/">Settings</Link>
            </div>
        </div>
    )
}