import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.basketItems = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
    this.continueToCheckoutButton = page.locator(
      '[data-qa="continue-to-checkout"]'
    );
  }

  removeCheapestProduct = async () => {
    await this.basketItems.first().waitFor();
    const itemsBeforeRemoval = await this.basketItems.count(); // Count of products in the basket before removal to test
    await this.basketItemPrice.first().waitFor();
    const allPricesTexts = await this.basketItemPrice.allInnerTexts(); //Output: ['499$', '566$']

    // convert prices to Int and remove $ sign
    const allPricesNumbers = allPricesTexts.map((price) => {
      const withoutDollarSign = price.replace("$", ""); // Output: '499$' -> '499'
      return parseInt(withoutDollarSign);
    });

    // remove item with the smallest price
    const smallestPrice = Math.min(...allPricesNumbers);
    const smallestPriceIndex = allPricesNumbers.indexOf(smallestPrice);
    await this.basketItemRemoveButton.nth(smallestPriceIndex).click(); // now we can click on a specific btn by using nth() method

    // test that product count is decreased (one less)
    await expect(this.basketItems).toHaveCount(itemsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToCheckoutButton.waitFor();

    await this.continueToCheckoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
