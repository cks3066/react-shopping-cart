import { useDispatch } from "react-redux";

import { actionCreators as cartActions } from "redux/modules/cart";

import { MESSAGE } from "constants/constants";

import * as S from "./styles";

function CartItemListController() {
  const dispatch = useDispatch();

  return (
    <S.CartItemListControllerWrapper justify="space-between">
      <S.CartItemListSelect>
        <input
          type="checkbox"
          id="all-check"
          onClick={(e) => {
            const targetInput = e.target as HTMLInputElement;
            dispatch(cartActions.toggleAllItemsSelected(targetInput.checked));
          }}
        />
        <label htmlFor="all-check">선택해제</label>
      </S.CartItemListSelect>
      <S.CartItemListDeleteButton
        onClick={() => {
          if (confirm(MESSAGE.CONFIRM_DELETE)) {
            dispatch(cartActions.deleteSelectedItems());
          }
        }}
      >
        상품삭제
      </S.CartItemListDeleteButton>
    </S.CartItemListControllerWrapper>
  );
}

export default CartItemListController;
