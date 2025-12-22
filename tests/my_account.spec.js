import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";

test.only("My account using cookie injection", async ({ page, request }) => {
  // Make a request to get login token
  const token = await getLoginToken(request);
  console.warn({ token });

  // Inject the login token into the browser
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();
});
