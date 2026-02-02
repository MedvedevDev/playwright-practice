import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
  readonly page: Page;
  readonly usingTheGridForm: Locator;
  readonly inlineForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    this.inlineForm = page.locator("nb-card", {
      hasText: "Inline form",
    });
  }

  /**
   * This method submits the Using The Grid Form
   * @param email - valid email for test user
   * @param password - valid password for test user
   * @param option - string 'Option 1' or 'Option 2'
   */
  async submitUsingTheGridForm(
    email: string,
    password: string,
    option: string,
  ) {
    await this.usingTheGridForm
      .getByRole("textbox", { name: "Email" })
      .fill(email);

    await this.usingTheGridForm
      .getByRole("textbox", { name: "Password" })
      .fill(password);

    await this.usingTheGridForm
      .getByRole("radio", { name: option })
      .check({ force: true });

    await this.usingTheGridForm.getByRole("button").click();
  }

  /**
   * This method submits the Inline Form
   * @param name - name should be first and last name
   * @param email - valid email for test user
   * @param rememberMeCheckbox - true or false session to be saved
   */
  async submitInlineForm(
    name: string,
    email: string,
    rememberMeCheckbox: boolean,
  ) {
    await this.inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await this.inlineForm.getByRole("textbox", { name: "Email" }).fill(email);

    if (rememberMeCheckbox) {
      await this.inlineForm.getByRole("checkbox").check({ force: true });
    }

    await this.inlineForm.getByRole("button").click();
  }
}
