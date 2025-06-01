import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';

let persistedCart = [];
let persistedOrder = null;

try {
    persistedCart = JSON.parse(localStorage.getItem('cart')) || [];
} catch (e) {
    persistedCart = [];
}

try {
    persistedOrder = JSON.parse(localStorage.getItem('order')) || null;
} catch (e) {
    persistedOrder = null;
}

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer
    },
    preloadedState: {
        cart: { items: persistedCart },
        order: { orderResult: persistedOrder }
    }
});