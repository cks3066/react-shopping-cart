import { rest } from "msw";

export const handlers = [
  rest.get("https://react-payments-onstar.herokuapp.com/productList/20", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        text: "가짜 응답입니다",
        body: "This is mocked response by handlers.ts",
      })
    );
  }),
];
