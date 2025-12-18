import { test, expect } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";

test.only("New user full end-to-end", async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.visitHomePage();
  await productsPage.sortByCheapest(); // sorting products
  await productsPage.addProductsToBasket(0);
  await productsPage.addProductsToBasket(1);
  await productsPage.addProductsToBasket(2);

  const navigation = new Navigation(page);
  await navigation.goToCheckout();

  const checkout = new CheckoutPage(page);
  await checkout.removeCheapestProduct();
  await checkout.continueToCheckout();

  const login = new LoginPage(page);
  await login.goToSignup();

  const registerPage = new RegisterPage(page);
  await registerPage.signup();
});
