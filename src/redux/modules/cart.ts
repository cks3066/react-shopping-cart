import { RootState } from "../store";

type Item = { name: string; price: number; img: string; id: number; amount: number };
type InitialState = { items: Item[] };
type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>;

// initialState
const initialState: InitialState = {
  items: [
    {
      name: "콜라",
      price: 1000,
      img: "",
      id: 1,
      amount: 0,
    },
  ],
};

// 액션
const ADD = "cart/add" as const;
const DELETE = "cart/delete" as const;
const INCREMENT = "cart/increment" as const;
const DECREMENT = "cart/decrement" as const;
const INCREMENT_BY_NUMBER = "cart/incrementByNumber" as const;

// 액션 크리에터
const addItem = (item: Item) => ({
  type: ADD,
  payload: { item },
});
const deleteItem = (id: number) => ({
  type: DELETE,
  payload: { id },
});
const increment = (id: number) => ({
  type: INCREMENT,
  payload: { id },
});
const decrement = (id: number) => ({
  type: DECREMENT,
  payload: { id },
});
const incrementByNumber = (id: number, number: number) => ({
  type: INCREMENT_BY_NUMBER,
  payload: { id, number },
});

// 리듀서
const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD: {
      const { item } = action.payload;
      const newItems = [...state.items, item];

      return { ...state, items: newItems };
    }
    case DELETE: {
      const { id } = action.payload;
      const newItems = state.items.filter((item) => item.id !== id);

      return { ...state, items: newItems };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount++;

      return { ...state, items: newItems };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount--;

      return { ...state, items: newItems };
    }

    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];
      newItems[targetIndex].amount += number;

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

export const selectCartList = (state: RootState) => state.cart.items;

export { addItem, deleteItem, increment, decrement, incrementByNumber };

export default cartReducer;