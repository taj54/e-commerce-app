import { createSlice } from '@reduxjs/toolkit';

// Helper functions for localStorage
const loadOrderResult = () => {
    try {
        const serialized = localStorage.getItem('orderResult');
        return serialized ? JSON.parse(serialized) : null;
    } catch {
        return null;
    }
};

const saveOrderResult = (orderResult) => {
    try {
        localStorage.setItem('orderResult', JSON.stringify(orderResult));
    } catch {}
};

const removeOrderResult = () => {
    try {
        localStorage.removeItem('orderResult');
    } catch {}
};

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderResult: loadOrderResult(),
    },
    reducers: {
        setOrderResult: (state, action) => {
            state.orderResult = action.payload;
            saveOrderResult(action.payload);
        },
        clearOrderResult: (state) => {
            state.orderResult = null;
            removeOrderResult();
        }
    }
});

export const { setOrderResult, clearOrderResult } = orderSlice.actions;
export default orderSlice.reducer;