import * as nodeFetch from "node-fetch";

export const getLoginToken = async (username, password) => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });

  if (response.status !== 200) {
    throw new Error("Error while trying to get login token");
  }

  const json = await response.json();
  // GET TOKEN
  const token = json.token;
  return token;

  // via request from test fixture || test.only("My account using cookie injection", async ({ page, request }) => {})
  //   const response = await request.post("http://localhost:2221/api/login", {
  //     data: {
  //       username,
  //       password,
  //     },
  //   });
  //   const responseBody = await response.json();
  //   // GET TOKEN
  //   const token = responseBody.token;
  //   return token;
};
