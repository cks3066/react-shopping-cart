import axios from "axios";

import { AppDispatch } from "../store";

import { API_URL } from "constants/constants";

type Product = {
  name: string;
  price: number;
  img: string;
  id: number;
};

export type ProductState = {
  loading: boolean;
  error: Error | null;
  productList: Product[];
};

export type Action =
  | ReturnType<typeof loadProducts>
  | ReturnType<typeof loadProductsSuccess>
  | ReturnType<typeof loadProductsFailed>;

// initialState
const initialState: ProductState = {
  loading: false,
  productList: [],
  error: null,
};

// 액션
const LOAD_PRODUCTS = "product/LOAD" as const;
const LOAD_PRODUCTS_SUCCESS = "product/LOAD_SUCCESS" as const;
const LOAD_PRODUCTS_FAILED = "product/LOAD_FAILED" as const;

// 액션 크리에터
const loadProducts = () => ({ type: LOAD_PRODUCTS });
const loadProductsSuccess = (productList: Product[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { productList },
});
const loadProductsFailed = (error: Error) => ({ type: LOAD_PRODUCTS_FAILED, payload: { error } });

// thunk
const loadProductsAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadProducts());
  try {
    const { data: productList } = await axios.get(API_URL);
    dispatch(loadProductsSuccess(productList));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadProductsFailed(error));
    }
  }
};

// 리듀서
const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS: {
      return { ...state, loading: true };
    }
    case LOAD_PRODUCTS_SUCCESS: {
      const { productList } = action.payload;

      return { ...state, loading: false, productList };
    }
    case LOAD_PRODUCTS_FAILED: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};

export const actionCreators = {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailed,
  loadProductsAPI,
};

export default productsReducer;
