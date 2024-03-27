import { configureStore } from '@reduxjs/toolkit';
import eshopSlice from './eshopSlice';

export default configureStore({
    reducer: {
        eshop: eshopSlice
    }
})