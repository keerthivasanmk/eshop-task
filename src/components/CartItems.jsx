// Dependencies
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

// components
import Quantity from '../components/Quantity'

function CategoryDetails() {
    const { cartItems } = useSelector(state => state.eshop);
    const cartItemKeys = Object.keys(cartItems);

    // Total price of all products in the cart (quantity * price_of_the_quantity)
    const total = cartItemKeys.reduce((accumulator, currentValue) => accumulator + cartItems?.[`${currentValue}`]?.quantity * parseInt(currentValue), 0);

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
                                <Link to='/orders' className='button-primary'>
                                    Place Order
                                </Link>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default CategoryDetails;