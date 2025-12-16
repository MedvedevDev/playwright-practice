import { expect } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.basketItems = page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = page.locator('[data-qa="basket-item-price"]');
    this.basketItemRemoveButton = page.locator(
      '[data-qa="basket-card-remove-item"]'
    );
  }

  removeCheapestProduct = async () => {
    const itemsBeforeRemoval = await this.basketItems.count(); // Count of products in the basket before removal to test
    const allPricesTexts = await this.basketItemPrice.allInnerTexts(); //Output: ['499$', '566$']

    // convert prices to Int and remove $ sign
    const allPricesNumbers = allPricesTexts.map((price) => {
      const withoutDollarSign = price.replace("$", ""); // Output: '499$' -> '499'
      return parseInt(withoutDollarSign);
    });

    // remove item with the smallest price
    const smallestPrice = Math.min(...allPricesNumbers);
    const smallestPriceIndex = allPricesNumbers.indexOf(smallestPrice);
    await this.basketItemRemoveButton.nth(smallestPriceIndex).waitFor(); // now we can click on a specific btn by using nth() method
    await this.basketItemRemoveButton.nth(smallestPriceIndex).click();

    // test that product count is decreased (one less)
    await expect(this.basketItems).toHaveCount(itemsBeforeRemoval - 1);
  };
}
