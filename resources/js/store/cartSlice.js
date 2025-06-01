import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const saveToLocalStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart(state, action) {
            state.items = action.payload;
            saveToLocalStorage(state.items);
        },
        addToCart(state, action) {
            const { product, variant, quantity, price } = action.payload;
            const existingIndex = state.items.findIndex(
                item => item.id === product.id && item.variant === variant
            );
            if (existingIndex !== -1) {
                state.items[existingIndex].quantity += quantity;
            } else {
                state.items.push({ ...product, variant, quantity, price });
            }
            saveToLocalStorage(state.items);
        },
        clearCart(state) {
            state.items = [];
            saveToLocalStorage(state.items);
        }
    }
});

export const { setCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;