// Dependencies
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function Orders() {
    const { cartItems } = useSelector(state => state.eshop);
    const cartItemKeys = Object.keys(cartItems);
    const total = cartItemKeys.reduce((accumulator, currentValue) => accumulator + cartItems?.[`${currentValue}`]?.quantity * parseInt(currentValue), 0);

    return (
        <div>
            <h2>Orders</h2>
            {
                !cartItemKeys?.length ?
                    <h3>Order is Empty. <Link to='/' className='underline'>Click here</Link> to add products.</h3> :
                    (<div className='order-container'>
                        <div className='order-header'>
                            <h4>Order Id: 5652</h4>
                            <h5>Total: $ {total} /-</h5>
                        </div>
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
                                    <span className='value'>{cartItems?.[`${item}`]?.quantity} * {item} = <strong>{cartItems?.[`${item}`]?.quantity * parseInt(item)}</strong></span>
                                </div>
                            ))
                        }
                    </div>)
            }
        </div>
    );
}

export default Orders;
