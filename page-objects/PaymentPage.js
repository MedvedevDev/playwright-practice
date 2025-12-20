import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder("Discount code");
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.discountedValue = page.locator(
      '[data-qa="total-with-discount-value"]'
    );
    this.discountMessage = page.locator('[data-qa="discount-active-message"]');

    // Buttons
    this.activateDiscountButton = page.locator(
      '[data-qa="submit-discount-button"]'
    );
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();

    const code = await this.discountCode.innerText();

    // fill out the discount input
    await this.discountInput.fill(code);
    await expect(this.discountInput).toHaveValue(code);

    // slow typing the discount input
    // ---1) With keyboard typing
    //await this.discountInput.focus();
    //await this.page.keyboard.type(code, { delay: 1000 });
    // ---2) With pressSequentially method
    // await this.discountInput.pressSequentially(code, { delay: 1000 });
    // expect(await this.discountInput.inputValue()).toBe(code);

    await this.activateDiscountButton.click();

    // Check that "Discount activated" text is displayed
    await this.discountMessage.waitFor();
    // Check that there is now a discounted price total showing
    await this.discountedValue.waitFor();
    // Check that the discounted price total is smaller than the regular price
    const totalValueText = await this.totalValue.innerText();
    const totalValueClear = totalValueText.replace("$", "");
    const totalValueNumber = parseInt(totalValueClear);

    const discountedValueText = await this.discountedValue.innerText();
    const discountedValueClear = discountedValueText.replace("$", "");
    const discountedValueNumber = parseInt(discountedValueClear);

    expect(discountedValueNumber).toBeLessThan(totalValueNumber);
  };
}
