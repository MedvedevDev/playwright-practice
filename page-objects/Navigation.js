export class Navigation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutPage = page.getByRole("link", { name: "Checkout" });
  }

  getBasketCount = async () => {
    const text = await this.basketCounter.innerText();
    return parseInt(text);
  };

  goToCheckout = async () => {
    await this.checkoutPage.click();
    await this.page.waitForURL("/basket");
  };
}
