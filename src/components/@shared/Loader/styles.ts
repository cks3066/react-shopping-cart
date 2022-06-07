import styled, { keyframes } from "styled-components";

const Spin = keyframes`
0% { 
    transform: rotate(0deg); 
}
100% { 
    transform: rotate(360deg);
 }
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 50vh;
`;

const Spinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #2ac1bc;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${Spin} 2s linear infinite;
`;

export { LoaderWrapper, Spinner };
