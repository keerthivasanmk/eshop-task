import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    meals: [],
    menuItemDetails: [],
    cartItems: {},
    orders: []
}

export const eshopSlice = createSlice({
    name: 'eshop',
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload
        },
        setMeals: (state, action) => {
            state.meals = action.payload
        },
        setMenuItemDetail: (state, action) => {
            state.menuItemDetails = action.payload
        },
        setCartItems: (state, action) => {
            state.cartItems = {...state.cartItems, ...action.payload}
        },
        emptyCart: (state) => {
            state.cartItems = {}
        },
        setOrders: (state, action) => {
            state.orders = [...state.orders, action.payload]
        }
    }
})

export const { setCategories, setMeals, setMenuItemDetail, setCartItems, emptyCart, setOrders } = eshopSlice.actions;
export default eshopSlice.reducer;