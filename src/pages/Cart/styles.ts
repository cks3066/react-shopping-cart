import styled from "styled-components";

const FlexBox = styled.div<{ direction?: string; justify?: string }>`
  display: flex;
  align-items: center;
  justify-content: ${({ justify = "center" }) => justify};
  flex-direction: ${({ direction = "row" }) => direction};
`;

const PageWrapper = styled(FlexBox)``;

const PageTitle = styled.div`
  width: 70%;
  height: 50px;
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 28px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const LeftContent = styled.div`
  width: 55%;
  align-self: start;
`;

const RightContent = styled.div`
  padding-top: 60px;
  width: 45%;
  align-self: start;
  display: flex;
  justify-content: end;
`;

const CartItemListTitle = styled.h2`
  width: 100%;
  border-bottom: 2px solid #aaaaaa;
  margin: 0;
  height: 40px;
  font-size: 20px;
  font-weight: 400;
`;

export { PageWrapper, PageTitle, Content, LeftContent, RightContent, CartItemListTitle };
