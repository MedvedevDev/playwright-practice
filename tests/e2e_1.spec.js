import { v4 as uuidv4 } from "uuid";
import { test } from "@playwright/test";
import { ProductsPage } from "../page-objects/ProductsPage";
import { Navigation } from "../page-objects/Navigation";
import { CheckoutPage } from "../page-objects/CheckoutPage";
import { LoginPage } from "../page-objects/LoginPage";
import { RegisterPage } from "../page-objects/RegisterPage";
import { DeliveryDetails } from "../page-objects/DeliveryDetails";
import { PaymentPage } from "../page-objects/PaymentPage";
import { deliveryDetails } from "../data/deliveryDetails";
import { paymentDetails } from "../data/paymentDetails";

test("New user full end-to-end", async ({ page }) => {
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
  const testEmail = uuidv4() + "@test.com";
  const testPassword = uuidv4();
  await registerPage.signup(testEmail, testPassword);

  const deliveryDetailsPage = new DeliveryDetails(page);
  await deliveryDetailsPage.fillDetails(deliveryDetails);
  await deliveryDetailsPage.saveDetails();
  await deliveryDetailsPage.verifySavedDetails();
  await deliveryDetailsPage.continueToPayment();

  const paymentPage = new PaymentPage(page);
  await paymentPage.activateDiscount();
  await paymentPage.fillPaymentDetails(paymentDetails);
  await paymentPage.completePayment();
});
