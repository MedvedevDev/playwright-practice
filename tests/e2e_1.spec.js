import { test, expect } from "@playwright/test";
import { ProductPage } from "../page-objects/ProductPage";

test.only("New user full end-to-end", async ({ page }) => {
  const productPage = new ProductPage(page);
  await productPage.visit();
});
