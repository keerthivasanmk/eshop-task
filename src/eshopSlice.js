import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    meals: [],
    menuItemDetails: [],
    cartItems: {}
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
        }
    }
})

export const { setCategories, setMeals, setMenuItemDetail, setCartItems } = eshopSlice.actions;
export default eshopSlice.reducer;