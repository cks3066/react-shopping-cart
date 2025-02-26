기능 요구 사항

- [x] 네비게이션 기능
  - [x] 네이게이션의 타이틀을 클릭하면, 상품 목록 페이지로 이동한다.
  - [x] 네비게이션의 목록에는 장바구니와 주문목록이 있다.
    - [x] 장바구니를 클릭하면, 장바구니 페이지로 이동한다.
    - [x] 주문목록을 클릭하면, 주문목록 페이지로 이동한다.
- [x] 상품 목록 페이지
  - [x] 상품 목록을 보여준다.
    - [x] 상품 목록은 json-sever를 통해 받아온다.
  - [x] 각 상품을 클릭하면, 상품 상세 페이지로 이동한다.
  - [x] 각 상품의 카트 모양의 버튼을 클릭하면, 상품이 장바구니에 추가된다.
    - [x] 이미 장바구니에 존재하는 상품일 시, 안내 메시지를 띄운다.
- [x] 상품 상세 페이지
  - [x] 장바구니 버튼을 누르면, 해당 상품을 장바구니에 추가한다.
    - [ ] 버튼을 눌렀을 때, 수량을 선택할 수 있는 선택창이 나온다. [심화]
  - [x] 상품의 이미지, 이름, 금액을 화면에 표시한다.
- [x] 장바구니 페이지
  - [x] 장바구니에 담긴 상품들을 화면에 표시한다.
    - [x] 장바구니에 담긴 상품의 수량을 표시한다.
  - [x] 특정 상품에 대한 삭제를 할 수 있는 버튼이 있다.
  - [x] 특정 상품의 수량을 조작할 수 있는 버튼이 있다.
  - [x] 모든 상품에 일괄 선택, 일괄 선택 해제를 할 수 있는 토글이 있다.
  - [x] 선택된 상품을 삭제할 수 있는 버튼이 있다.
  - [x] 선택된 제품과 그 수량에 따라 결제 예상 금액을 보여준다.
  - [ ] 주문하기 버튼을 누르면 주문할 수 있다. [심화]
