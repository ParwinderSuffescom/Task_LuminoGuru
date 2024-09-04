import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  getProductPayload,
  PaginatedResponse,
  Product,
  ProductState,
} from './home.types';
import URLs from '../config/urls';
import api from '../apis/api';

export const productListing = createAsyncThunk(
  'request/product',
  async (payload: getProductPayload, thunkAPI) => {
    try {
      const response = await api({
        method: 'GET',
        url: URLs.getProducts(payload),
        headers: {
          'Content-Type': 'application/json',
          version: 2,
        },
      });
      const data = response?.data as PaginatedResponse<Product>;
      console.log('🚀 ~ data:', data);
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
  favoriteList: [],
  cartItemList: [],
};

export const homeSlice = createSlice({
  name: 'roster',
  initialState: rosterState,
  reducers: {
    clearProductLoading: state => {
      state.productListLoading = 'idle';
    },
    addOrRemoveFavorite: (state, action) => {
      const itemExists = state.favoriteList.some(
        item => item.id === action.payload.id,
      );
      if (itemExists) {
        state.favoriteList = state.favoriteList.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.favoriteList.push(action.payload);
      }
    },
    addOrRemoveToCart: (state, action) => {
      const itemExists = state.cartItemList.some(
        item => item.id === action.payload.id,
      );
      if (itemExists) {
        state.cartItemList = state.cartItemList.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.cartItemList.push(action.payload);
      }
    },
    addMoreItem: (state, action) => {
      let arr = JSON.parse(JSON.stringify(state.cartItemList));
      const selectedItemIndex = state.cartItemList.findIndex(
        item => item.id === action.payload.id,
      );
      arr[selectedItemIndex].count = (arr[selectedItemIndex].count ?? 1) + 1;
      state.cartItemList = arr;
      console.log('arr', arr);
    },
    removeItem: (state, action) => {
      let arr = JSON.parse(JSON.stringify(state.cartItemList));
      const selectedItemIndex = state.cartItemList.findIndex(
        item => item.id === action.payload.id,
      );
      if (!arr[selectedItemIndex].count || arr[selectedItemIndex].count === 1) {
        arr = arr.filter((item: {id: any}) => item.id !== action.payload.id);
      } else {
        arr[selectedItemIndex].count = (arr[selectedItemIndex].count ?? 1) - 1;
      }
      state.cartItemList = arr;
    },
  },
  extraReducers: builder => {
    // Get Product Listing
    builder
      .addCase(productListing.pending, state => {
        state.productListLoading = 'loading';
      })
      .addCase(productListing.fulfilled, (state, action) => {
        state.productListLoading = 'loaded';
        state.productListData =
          action.payload.skip === 0
            ? action.payload
            : {
                ...action.payload,
                products: [
                  ...state.productListData.products,
                  ...action.payload.products,
                ],
                skip: action.payload.skip,
                total: action.payload.total,
              };
      })
      .addCase(productListing.rejected, state => {
        state.productListLoading = 'failed';
      });
  },
});

export const homeReducer = homeSlice.reducer;
export const homeActions = homeSlice.actions;
