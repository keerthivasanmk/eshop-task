// Dependencies
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useSearchParams } from "react-router-dom";

// store
import { emptyCart } from '../eshopSlice';

function Orders() {
    const { orders } = useSelector(state => state.eshop);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    let firstOrderId = 1001;

    useEffect(() => {
        if(searchParams.get('order') === 'success') {
            dispatch(emptyCart());
        }
    }, [])

    const getTotal = (order, orderKeys) => {
        return orderKeys.reduce((accumulator, currentValue) => accumulator + order?.[`${currentValue}`]?.quantity * parseInt(currentValue), 0);
    }

    return (
        <div>
            <h2>Orders</h2>
            {
                !orders?.length ?
                    <h3>Order is Empty. <Link to='/' className='underline'>Click here</Link> to add products.</h3> :
                    orders?.map((order, index) => {
                        const orderKeys = Object.keys(order);
                        return(
                            <div className='order-container' key={order}>
                                <div className='order-header'>
                                    <h4>Order Id: {firstOrderId + index}</h4>
                                    <h5>Total: $ {getTotal(order, orderKeys)} /-</h5>
                                </div>
                                {
                                    orderKeys?.map((item) => (
                                        <div className='item-row' key={item}>
                                            <div className='item-details'>
                                                <img
                                                    src={order?.[`${item}`]?.strMealThumb}
                                                    alt='product-thumbnail'
                                                    height={100}
                                                />
                                                <div>
                                                    <p>{order?.[`${item}`]?.strMeal}</p>
                                                    <p>$ {item} /-</p>
                                                </div>
                                            </div>
                                            <span className='value'>{order?.[`${item}`]?.quantity} * {item} = <strong>{order?.[`${item}`]?.quantity * parseInt(item)}</strong></span>
                                        </div>
                                    ))
                                }
                            </div>
                        )    
                    })
            }
        </div>
    );
}

export default Orders;
