import { expect } from "@playwright/test";

export class PaymentPage {
  constructor(page) {
    this.page = page;
    this.discountCode = page
      .frameLocator('[data-qa="active-discount-container"]')
      .locator('[data-qa="discount-code"]');
    this.discountInput = page.getByPlaceholder("Discount code");
  }

  activateDiscount = async () => {
    await this.discountCode.waitFor();

    const code = await this.discountCode.innerText();

    // fill out the discount input
    // await this.discountInput.fill(code);
    // await expect(this.discountInput).toHaveValue(code);

    // slow typing the discount input
    // ---1) With keyboard typing
    //await this.discountInput.focus();
    //await this.page.keyboard.type(code, { delay: 1000 });
    // ---2) With pressSequentially method
    await this.discountInput.pressSequentially(code, { delay: 1000 });
    expect(await this.discountInput.inputValue()).toBe(code);
  };
}
