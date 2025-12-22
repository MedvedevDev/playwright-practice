import * as nodeFetch from "node-fetch";

export const getLoginToken = async (request) => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({ username: "admin", password: "Admin123" }),
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
  //       username: "admin",
  //       password: "Admin123",
  //     },
  //   });
  //   const responseBody = await response.json();
  //   // GET TOKEN
  //   const token = responseBody.token;
  //   return token;
};
