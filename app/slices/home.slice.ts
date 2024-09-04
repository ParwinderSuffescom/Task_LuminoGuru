import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {PaginatedResponse, Product, ProductState} from './home.types';
import URLs from '../config/urls';
import api from '../apis/api';

export const productListing = createAsyncThunk(
  'request/product',
  async (payload: number, thunkAPI) => {
    try {
      const response = await api({
        method: 'GET',
        url: URLs.getProducts(payload),
        headers: {
          'Content-Type': 'application/json',
          version: 2,
        },
      });
      const data = response?.data?.body as Product;
      return data;
    } catch (error) {
      throw thunkAPI.rejectWithValue(error);
    }
  },
);

const initialListData: PaginatedResponse<Product> = {
  products: [],
  total: 0,
  skip: 0,
  limit: 0,
};

const rosterState: ProductState = {
  productListLoading: 'idle',
  productListData: initialListData,
};

export const homeSlice = createSlice({
  name: 'roster',
  initialState: rosterState,
  reducers: {
    clearAcademyLoading: state => {
      state.productListLoading = 'idle';
    },
  },
  extraReducers: builder => {
    // Get Academy Listing
    builder
      .addCase(productListing.pending, state => {
        state.productListLoading = 'loading';
      })
      .addCase(productListing.fulfilled, (state, action) => {
        state.productListLoading = 'loaded';
        state.productListData =
          state.productListData.products?.length !== 0
            ? {
                ...action.payload,

                products: [
                  ...state.productListData.products,
                  ...action.payload,
                ],
              }
            : action.payload;
      })
      .addCase(productListing.rejected, state => {
        state.productListLoading = 'failed';
      });
  },
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
