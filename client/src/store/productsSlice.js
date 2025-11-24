// zhennova-ecommerce-client/src/store/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// La URL de tu API para productos
const API_URL = 'http://localhost:3001/api/products'; 

// Thunk para obtener todos los productos
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al cargar los productos';
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  products: [],
  loading: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.products = action.payload; // Asume que el payload es la lista de productos
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
        state.products = [];
      });
  },
});

export default productsSlice.reducer;