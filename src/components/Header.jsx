import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';

export default function Header({ children }) {
    const { cartItems } = useSelector(state => state.eshop);
    const totalQuantity = Object.values(cartItems)?.reduce((acc, curr) => acc + curr.quantity, 0);

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
                <Link to="/cart">
                    Cart
                    {totalQuantity ? <span className="badge">{totalQuantity}</span> : null}
                </Link>
                <Link to="/orders">Orders</Link>
            </div>
        </div>
    )
}