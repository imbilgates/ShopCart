import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
        isFetching: false,
        isCreating: false,
        isUpdating: false,
        isDeleting: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Products
            .addCase(fetchProducts.pending, (state) => {
                state.isFetching = true;
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isFetching = false;
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isFetching = false;
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Create Product
            .addCase(createProduct.pending, (state) => {
                state.isCreating = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isCreating = false;
                if (action.payload.success) {
                    state.products.push(action.payload.data);
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isCreating = false;
                state.error = action.error.message;
            })

            // Delete Product
            .addCase(deleteProduct.pending, (state) => {
                state.isDeleting = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isDeleting = false;
                if (action.payload.success) {
                    state.products = state.products.filter(
                        (product) => product._id !== action.payload.pid
                    );
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isDeleting = false;
                state.error = action.error.message;
            })

            // Update Product
            .addCase(updateProduct.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isUpdating = false;
                if (action.payload.success) {
                    const index = state.products.findIndex(
                        (product) => product._id === action.payload.data._id
                    );
                    if (index !== -1) {
                        state.products[index] = action.payload.data;
                    }
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;


export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    return data.data;
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
        return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch(`${BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    return { success: true, message: "Product created successfully", data: data.data };
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (pid) => {
    const res = await fetch(`${BASE_URL}/api/products/${pid}`, { method: 'DELETE' });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    return { success: true, message: "Product deleted successfully", pid };
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ pid, updatedProduct }) => {
    const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    return { success: true, message: "Product updated successfully", data: data.data };
});