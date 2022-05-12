import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Styled from "./styles";
import cart from "../../assets/cart.svg";
import { addItem, decrement, deleteItem, increment } from "../../redux/modules/cart";
import { generateSnackBar } from "../../redux/modules/snackBar";
import { useCartItemSelector, useCartListSelector } from "../../hooks/useCartSelector";

export type ProductType = {
  name: string;
  price: number;
  img: string;
  id: number;
};
interface ProductProps {
  productInfo: ProductType;
}

function Product({ productInfo }: ProductProps) {
  const [isShowCartCounter, setIsShowCartCounter] = useState(false);
  const { name, price, img, id } = productInfo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useCartListSelector();
  const cartItem = useCartItemSelector(id);
  const timeout = useRef<NodeJS.Timeout>();

  const onClickCartImage = () => {
    setIsShowCartCounter((prev) => !prev);
    if (!cartItems.some((items) => items.id === id)) {
      const newItem = { name, price, img, id, amount: 1 };

      dispatch(addItem(newItem));
      dispatch(generateSnackBar("장바구니에 추가되었습니다. 😍"));
    }
  };

  const onClickDecreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem?.amount === 1) {
      dispatch(deleteItem(id));
      setIsShowCartCounter(false);
      dispatch(generateSnackBar("장바구니에서 삭제되었습니다. 🥲"));
      return;
    }
    dispatch(decrement(id));
  };

  const conClickIncreaseCounter = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (cartItem) {
      dispatch(increment(id));
      return;
    }
    dispatch(addItem({ name, price, img, id, amount: 1 }));
  };

  useEffect(() => {
    if (isShowCartCounter) {
      timeout.current = setTimeout(() => {
        setIsShowCartCounter(false);
      }, 3000);
    }
  }, [isShowCartCounter, cartItem?.amount]);

  return (
    <Styled.ProductWrapper>
      <Styled.ProductImageWrapper>
        <Styled.ProductImage onClick={() => navigate(`/product/${id}`)} src={img} alt={name} />
      </Styled.ProductImageWrapper>
      <Styled.ProductInfoWrapper>
        <Styled.ProductInfo onClick={() => navigate(`/product/${id}`)}>
          <span>{name}</span>
          <span>{price.toLocaleString()}원</span>
        </Styled.ProductInfo>
        <Styled.CartImageWrapper>
          {cartItem?.amount && <Styled.CartImageBadge />}

          <Styled.CartImage onClick={onClickCartImage} src={cart} alt="장바구니" />
        </Styled.CartImageWrapper>
        <Styled.CartCounter isShowCartCounter={isShowCartCounter}>
          <Styled.CartCounterButton onClick={onClickDecreaseCounter}>-</Styled.CartCounterButton>
          <span>{cartItem?.amount ?? 0}</span>
          <Styled.CartCounterButton onClick={conClickIncreaseCounter}>+</Styled.CartCounterButton>
        </Styled.CartCounter>
      </Styled.ProductInfoWrapper>
    </Styled.ProductWrapper>
  );
}

export default Product;