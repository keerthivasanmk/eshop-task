// Dependencies
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";

// components
import Quantity from '../components/Quantity'

// store
import { setOrders } from '../eshopSlice';

function CategoryDetails() {
    const { cartItems } = useSelector(state => state.eshop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItemKeys = Object.keys(cartItems);
  
    // Total price of all products in the cart (quantity * price_of_the_quantity)
    const total = cartItemKeys.reduce((accumulator, currentValue) => accumulator + cartItems?.[`${currentValue}`]?.quantity * parseInt(currentValue), 0);

    const placeOrder = () => {
        dispatch(setOrders(cartItems));
        navigate("/orders?order=success");
    }

    return (
        <div>
            <h2>Cart Items</h2>
            <div className='cart-container'>
                {
                    !cartItemKeys?.length ?
                        <h3>Cart is Empty. <Link to='/' className='underline'>Click here</Link> to add products.</h3> :
                        <>
                            <div className='cart-items'>
                                {
                                    cartItemKeys?.map((item) => (
                                        <div className='item-row' key={item}>
                                            <div className='item-details'>
                                                <img
                                                    src={cartItems?.[`${item}`]?.strMealThumb}
                                                    alt='product-thumbnail'
                                                    height={100}
                                                />
                                                <div>
                                                    <p>{cartItems?.[`${item}`]?.strMeal}</p>
                                                    <p>$ {item} /-</p>
                                                </div>
                                            </div>
                                            <Quantity
                                                menuId={item}
                                                menuDetails={cartItems?.[`${item}`]}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='summary-container'>
                                <div className='summary'>
                                    <h4>Summary</h4>
                                    <div className='summary-details'>
                                        <div className='split-up'>
                                            {
                                                cartItemKeys?.map((item) => (
                                                    <div className='item'>
                                                        <span>{cartItems?.[`${item}`]?.strMeal}</span>
                                                        <span className='value'>{cartItems?.[`${item}`]?.quantity} * {item} = {cartItems?.[`${item}`]?.quantity * parseInt(item)}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className='total value'>Total = {total}</div>
                                    </div>
                                </div>
                                <div className='button-primary' onClick={placeOrder}>
                                    Place Order
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default CategoryDetails;