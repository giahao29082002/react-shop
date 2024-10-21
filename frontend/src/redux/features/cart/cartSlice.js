/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.products.find((product) => product._id === action.payload._id);
            if (!existingProduct) {
                state.products.push({ ...action.payload, quantity: 1 });
            } else {
                console.log("Item already added");
            }
            updateCartTotals(state);
        },
        updateQuantity: (state, action) => {
            const { id, type } = action.payload;
            const product = state.products.find((product) => product._id === id);

            if (product) {
                if (type === 'increment') {
                    product.quantity += 1;
                } else if (type === 'decrement') {
                    if (product.quantity > 1) {
                        product.quantity -= 1;
                    }
                }

                // Remove product if quantity is zero
                if (product.quantity === 0) {
                    state.products = state.products.filter((product) => product._id !== id);
                }
            }
            updateCartTotals(state);
        },
        removeFromCart:(state,action) =>{  
            state.products = state.products.filter((product) => product._id !== action.payload.id);
            state.selectedItems = setSelectedItems(state);
            state.totalPrice = setTotalPrice(state);
            state.tax = setTax(state);
            state.grandTotal = setGrandTotal(state);
        },
        clearCart: (state,action) => {
            state.products =[];
            state.selectedItems = 0;
            state.totalPrice = 0;
            state.tax =0;
            state.grandTotal=0;
        }
    },
});

// Utility function to update cart totals
const updateCartTotals = (state) => {
    state.selectedItems = setSelectedItems(state);
    state.totalPrice = setTotalPrice(state);
    state.tax = setTax(state);
    state.grandTotal = setGrandTotal(state);
};

// Calculate total selected items
export const setSelectedItems = (state) => state.products.reduce((total, product) => total + product.quantity, 0);

// Calculate total price
export const setTotalPrice = (state) => state.products.reduce((total, product) => total + product.quantity * product.price, 0);

// Calculate tax
export const setTax = (state) => setTotalPrice(state) * state.taxRate;

// Calculate grand total
export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity,removeFromCart,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
