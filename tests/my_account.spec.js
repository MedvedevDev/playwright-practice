import { test } from "@playwright/test";
import { MyAccountPage } from "../page-objects/MyAccountPage";
import { getLoginToken } from "../api-calls/getLoginToken";
import { addCookieContext } from "../utils/addCookieContext";
import { admin } from "../data/loginDetails";

test.only("My account using cookie injection", async ({ page }) => {
  // Make a request to get login token
  const token = await getLoginToken(admin.username, admin.password);

  // Inject the login token into the browser
  const myAccount = new MyAccountPage(page);
  await myAccount.visit();

  await page.evaluate(
    ([tokenInsideBrowserCode]) => {
      document.cookie = "token=" + tokenInsideBrowserCode;
    },
    [token]
  );
  // await addCookieContext(page, token); // set cookie using context.addCookies

  await myAccount.visit();
  await myAccount.waitForPageHeading();
});
