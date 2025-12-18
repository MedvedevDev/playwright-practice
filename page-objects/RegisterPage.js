import { v4 as uuidv4 } from "uuid";

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.emailInputField = page.getByPlaceholder("E-Mail");
    this.passwordInputField = page.getByPlaceholder("Password");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  signup = async () => {
    await this.emailInputField.waitFor();
    const testEmail = uuidv4() + "@test.com";

    await this.emailInputField.fill(testEmail);
    await this.passwordInputField.fill("testpass");
    await this.registerButton.click();

    await this.page.pause();
  };
}
