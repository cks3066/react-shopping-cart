import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import Header from '../../components/Header/Header';
import PaymentInfoBox from '../../components/PaymentInfoBox/PaymentInfoBox';
import CheckBox from '../../components/CheckBox/CheckBox';
import AmountCounter from '../../components/AmountCounter/AmountCounter';
import ScreenContainer from '../../shared/styles/ScreenContainer';
import {
  Container,
  OptionContainer,
  ShoppingCartContainer,
  ShoppingCartListTitle,
  ShoppingCartList,
  PaymentInfoBoxContainer,
  ShoppingCartItemContainer,
  ShoppingCartItem,
  ShoppingCartItemOption,
  DeleteButton,
} from './ShoppingCartPage.styles';
import RowProductItem from '../../components/ProductItem/RowProductItem/RowProductItem';
import { ROUTE, AMOUNT_COUNT } from '../../constants';
import useServerAPI from '../../hooks/useServerAPI';

const TrashCanIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path
      d="M8.4 10L8.4 17M13.4 10V17M4.88636 4V2.68775C4.88636 2.24685 5.0589 1.82345 5.36706 1.50813C5.68461 1.18318 6.11977 1 6.57412 1H14.9259C15.3802 1 15.8154 1.18318 16.1329 1.50813C16.4411 1.82345 16.6136 2.24685 16.6136 2.68775V4M21.5 4.9H0M2.5 7V18.5451C2.5 19.1593 2.73024 19.7512 3.14527 20.2039C3.61025 20.7112 4.26679 21 4.95493 21H16.5451C17.2332 21 17.8897 20.7112 18.3547 20.2039C18.7698 19.7512 19 19.1593 19 18.5451V7"
      stroke="#BBBBBB"
      strokeWidth="1.8"
    />
  </svg>
);

const ShoppingCartPage = () => {
  const history = useHistory();
  const location = useLocation();
  const { value: productList } = useServerAPI([], 'productList');
  const { value: shoppingCartList, putData: deleteShoppingCartItem } = useServerAPI([], 'shoppingCart');

  const [checkedIdList, setCheckedIdList] = useState([]);
  const [isAllChecked, setAllChecked] = useState(false);
  const [shoppingCartItemList, setShoppingCartItemList] = useState([]);
  const [expectedPrice, setExpectedPrice] = useState(0);

  const onClickAllCheckBox = () => {
    setAllChecked(!isAllChecked);
  };

  const onClickCheckBox = event => {
    const { target } = event;

    if (target.checked) {
      setCheckedIdList(prevState => [...prevState, target.id]);
    } else {
      setCheckedIdList(prevState => prevState.filter(productId => productId !== target.id));
    }
  };

  const onClickDeleteButton = targetId => {
    if (!window.confirm('정말로 삭제하시겠습니까?')) return;

    const content = {
      productIdList: targetId
        ? shoppingCartList[0]?.productIdList.filter(productId => productId !== targetId)
        : shoppingCartList[0]?.productIdList.filter(productId => !checkedIdList.includes(productId)),
    };

    deleteShoppingCartItem(shoppingCartList[0].id, content);
  };

  const onClickPaymentButton = () => {
    if (!window.confirm('상품을 결제하시겠습니까?')) return;

    const content = {
      productIdList: shoppingCartList[0]?.productIdList.filter(productId => !checkedIdList.includes(productId)),
    };

    deleteShoppingCartItem(shoppingCartList[0].id, content);

    history.push({
      pathname: ROUTE.ORDER_CHECKOUT,
      state: {
        checkedItemList: shoppingCartItemList.filter(product => checkedIdList.includes(product.id)),
      },
    });
  };

  const onClickAmountCounter = (productId, flag) => {
    const newState = [...shoppingCartItemList];
    const targetProduct = newState.find(item => item.id === productId);

    if (flag === 'up') {
      targetProduct.amount += targetProduct.amount < AMOUNT_COUNT.MAX ? 1 : 0;
    } else if (flag === 'down') {
      targetProduct.amount -= targetProduct.amount > AMOUNT_COUNT.MIN ? 1 : 0;
    }

    setShoppingCartItemList(newState);
  };

  useEffect(() => {
    setShoppingCartItemList(
      productList
        .filter(product => shoppingCartList[0]?.productIdList.includes(product.id))
        .map(product => ({ ...product, amount: 1 }))
    );
  }, [productList, shoppingCartList]);

  useEffect(() => {
    if (isAllChecked) {
      setCheckedIdList(shoppingCartList[0]?.productIdList);
    } else {
      setCheckedIdList([]);
    }
  }, [isAllChecked, shoppingCartList]);

  useEffect(() => {
    const newExpectedPrice = checkedIdList.reduce((acc, checkedId) => {
      const { price, amount } = shoppingCartItemList.find(shoppingCartItem => shoppingCartItem.id === checkedId);

      return acc + price * amount;
    }, 0);

    setExpectedPrice(newExpectedPrice);
  }, [checkedIdList, shoppingCartItemList]);

  return (
    <ScreenContainer route={location.pathname}>
      <Header>장바구니</Header>

      <Container>
        <ShoppingCartContainer>
          <OptionContainer>
            <CheckBox id="all-check" onClick={onClickAllCheckBox} isChecked={isAllChecked} />
            <span>모두선택</span>
            <DeleteButton onClick={() => onClickDeleteButton()}>상품삭제</DeleteButton>
          </OptionContainer>

          <ShoppingCartListTitle>{`장바구니 상품 (${shoppingCartItemList.length}개)`}</ShoppingCartListTitle>

          <ShoppingCartList>
            {shoppingCartItemList.map(item => {
              const { id, img, name, price, amount } = item;
              const isChecked = checkedIdList.includes(id);

              return (
                <ShoppingCartItemContainer key={id}>
                  <ShoppingCartItem>
                    <CheckBox id={id} onClick={onClickCheckBox} isChecked={isChecked} />
                    <RowProductItem imgSrc={img} name={name} />
                  </ShoppingCartItem>

                  <ShoppingCartItemOption>
                    <button type="button" onClick={() => onClickDeleteButton(id)}>
                      {TrashCanIcon}
                    </button>
                    <AmountCounter
                      value={amount}
                      onClickUp={() => onClickAmountCounter(id, 'up')}
                      onClickDown={() => onClickAmountCounter(id, 'down')}
                    />
                    <span>{`${price * amount}원`}</span>
                  </ShoppingCartItemOption>
                </ShoppingCartItemContainer>
              );
            })}
          </ShoppingCartList>
        </ShoppingCartContainer>

        <PaymentInfoBoxContainer>
          <PaymentInfoBox
            title="결제예상금액"
            detailText="결제예상금액"
            price={expectedPrice}
            buttonText={`주문하기(${checkedIdList.length}개)`}
            onClick={onClickPaymentButton}
            isDisable={!checkedIdList.length}
          />
        </PaymentInfoBoxContainer>
      </Container>
    </ScreenContainer>
  );
};

export default ShoppingCartPage;
