// Dependencies
import { useSelector, useDispatch } from 'react-redux';

// store
import { setCartItems } from '../eshopSlice';

function MenuItemDetails(props) {
    const { menuId, menuDetails } = props;
    const { cartItems } = useSelector(state => state.eshop);
    const dispatch = useDispatch();
    let menuItemDetails = {...menuDetails};

    // handles if prop structure is differernt
    if(menuId) {
        menuItemDetails['idMeal'] = menuId;
    }

    const quantity = cartItems[`${menuItemDetails?.idMeal}`]?.quantity || 0;

    // hanldes increment decrement
    const manageCart = (type) => {
        let updatedQuantity;
        if (type === 'increment') {
            updatedQuantity = (quantity || 0) + 1;
        }
        else {
            if (quantity) {
                updatedQuantity = (quantity || 0) - 1;
            }
        }
        const cartItem = {
            [`${menuItemDetails?.idMeal}`]: {
                strMeal: menuItemDetails?.strMeal,
                strMealThumb: menuItemDetails?.strMealThumb,
                quantity: updatedQuantity
            }
        }
        dispatch(setCartItems(cartItem));
    }

    const handleInputChange = (e) => {
        let cartItem;
        if (isNaN(e.target.value))
            return false;
        if (!e.target.value) {
            cartItem = {
                [`${menuItemDetails?.idMeal}`]: {
                    ...menuItemDetails,
                    quantity: 0
                }
            }
        }
        else {
            cartItem = {
                [`${menuItemDetails?.idMeal}`]: {
                    ...menuItemDetails,
                    quantity: e.target.value
                }
            }
        }
        dispatch(setCartItems(cartItem));
    }

    return (
        <div>
            <div className='quantity'>
                <button onClick={() => manageCart('decrement')}>
                    -
                </button>
                <input
                    value={cartItems[`${menuItemDetails?.idMeal}`]?.quantity || 0}
                    onChange={handleInputChange}
                    className='quantity-value'
                />
                <button onClick={() => manageCart('increment')}>
                    +
                </button>
            </div>
        </div>
    );
}

export default MenuItemDetails;