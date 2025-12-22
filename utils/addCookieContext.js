export const addCookieContext = async (page, token) => {
  await page.context().addCookies([
    {
      name: "token",
      value: token,
      domain: "localhost",
      path: "/",
    },
  ]);
};
