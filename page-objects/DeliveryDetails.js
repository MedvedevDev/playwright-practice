import { expect } from "@playwright/test";

export class DeliveryDetails {
  constructor(page) {
    this.page = page;
    // Input form fields
    this.firstnameInput = page.getByPlaceholder("First name");
    this.lastnameInput = page.getByPlaceholder("Last name");
    this.streetInput = page.getByPlaceholder("Street");
    this.postcodeInput = page.getByPlaceholder("Post code");
    this.cityInput = page.getByPlaceholder("City");
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
    this.saveDetailsButton = page.getByRole("button", {
      name: "Save address for next time",
    });

    // Adress container fields
    this.savedDetailsContainer = page.locator(
      '[data-qa="saved-address-container"]'
    );
    this.savedFirstname = page.locator('[data-qa="saved-address-firstName"]');
    this.savedLastname = page.locator('[data-qa="saved-address-lastName"]');
    this.savedStreet = page.locator('[data-qa="saved-address-street"]');
    this.savedPostcode = page.locator('[data-qa="saved-address-postcode"]');
    this.savedCity = page.locator('[data-qa="saved-address-city"]');
    this.savedCountry = page.locator('[data-qa="saved-address-country"]');
  }

  fillDetails = async (deliveryDetails) => {
    await this.firstnameInput.waitFor();
    await this.firstnameInput.fill(deliveryDetails.firstName);
    await this.lastnameInput.fill(deliveryDetails.lastName);
    await this.streetInput.fill(deliveryDetails.street);
    await this.postcodeInput.fill(deliveryDetails.postcode);
    await this.cityInput.fill(deliveryDetails.city);
    await this.countryDropdown.selectOption(deliveryDetails.country);
  };

  saveDetails = async () => {
    await this.saveDetailsButton.waitFor();

    const detailsCountBeforeSaving = await this.savedDetailsContainer.count(); // if there is already some saved adress details
    await this.saveDetailsButton.click();

    await expect(this.savedDetailsContainer).toHaveCount(
      detailsCountBeforeSaving + 1
    ); // check that new data is saved  and desplayed after cliking button
  };

  verifySavedDetails = async () => {
    await this.savedFirstname.first().waitFor();
    expect(await this.savedFirstname.first().innerText()).toBe(
      await this.firstnameInput.inputValue()
    );
    expect(await this.savedLastname.first().innerText()).toBe(
      await this.lastnameInput.inputValue()
    );
    expect(await this.savedStreet.first().innerText()).toBe(
      await this.streetInput.inputValue()
    );
    expect(await this.savedPostcode.first().innerText()).toBe(
      await this.postcodeInput.inputValue()
    );
    expect(await this.savedCity.first().innerText()).toBe(
      await this.cityInput.inputValue()
    );
    expect(await this.savedCountry.first().innerText()).toBe(
      await this.countryDropdown.inputValue()
    );
    await this.page.pause();
  };
}
