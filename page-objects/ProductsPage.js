import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";

export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.addToBasketButtons = page.locator('[data-qa="product-button"]'); // array
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
    this.productTitles = page.locator('[data-qa="product-title"]');
  }

  visitHomePage = async () => {
    await this.page.goto("/");
  };

  addProductsToBasket = async (index) => {
    const addButton = this.addToBasketButtons.nth(index);

    await expect(addButton).toHaveText("Add to Basket");
    const navigation = new Navigation(this.page);
    const basketCountBeforeAdding = await navigation.getBasketCount();

    await addButton.click();
    await expect(addButton).toHaveText("Remove from Basket");
    const basketCountAfterAdding = await navigation.getBasketCount();

    // verify basket count
    expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
  };

  sortByCheapest = async () => {
    // get order of products
    const productsBeforeSorting = await this.productTitles.allInnerTexts();
    await this.sortDropdown.selectOption("price-asc");

    // get order of products after sorting
    const productsAfterSorting = await this.productTitles.allInnerTexts();

    // expect that these lists are different
    expect(productsBeforeSorting).not.toEqual(productsAfterSorting);
    console.log(productsAfterSorting);
    console.log(productsBeforeSorting);
  };
}
