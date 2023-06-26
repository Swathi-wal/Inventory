import { createSlice } from '@reduxjs/toolkit'
export const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        deleteProduct: (state, action) => {
            state.splice(action.payload, 1)
        },
        deleteCart: (state) => {
            state.splice(0, state.length)
        }
    }
})
//create action creator function
export const { addProduct, deleteProduct, deleteCart } = productSlice.actions;
//export all reducers as a single reducer object
export default productSlice.reducer;