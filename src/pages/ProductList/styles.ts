import styled from "styled-components";

const ProductsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 220px);
  grid-template-rows: repeat(1fr);
  grid-gap: 30px;
  justify-content: center;
  margin: 0 160px;
`;

export { ProductsWrapper };
