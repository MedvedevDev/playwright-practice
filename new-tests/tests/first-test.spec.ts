import { expect, test } from "@playwright/test";

test.beforeEach("go to localhost", async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("User facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();

  await page.getByRole("button", { name: "Sign In" }).first().click();

  await page.getByLabel("Email").first().click();

  await page.getByPlaceholder("Jane Doe").click();

  await page.getByText("Using The Grid").click();

  await page.getByTestId("testid-test").click();
});

test("Locating child elements", async ({ page }) => {
  await page.locator('nb-card-body nb-radio :text-is("Option 1")').click();

  // chaining locators one by one
  await page
    .locator("nb-card-body")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();

  // nth element
  await page.locator("nb-card").nth(4).getByRole("button").click();
});

test("Locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Block form" })
    .getByRole("textbox", { name: "Last Name" })
    .fill("My Last Name");

  await page
    .locator("nb-card", { has: page.locator("#inputWebsite") })
    .getByPlaceholder("Website")
    .fill("asdfsd@fdsfsd.cc");

  // filter method - hasText
  await page
    .locator("nb-card")
    .filter({ hasText: "Horizontal form" })
    .getByRole("textbox", { name: "Email" })
    .fill("fsdfdsfsd@fdsfsd.cc");

  // filter method - has (locator)
  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-warning") })
    .getByRole("textbox", { name: "Password" })
    .fill("gdfgdfgfdgdf");

  await page
    .locator("nb-card")
    .filter({
      has: page.getByRole("button", { name: "Sign In" }),
    })
    .nth(0)
    .click();
});

test("Extracting values", async ({ page }) => {
  // get single value and assert it
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();
  expect(buttonText).toEqual("Submit");

  // gett all text values  and assert that at least one is true
  const allRadioButtonLabels = await page.locator("nb-radio").allTextContents();
  console.log(allRadioButtonLabels); //[ 'Option 1', 'Option 2', 'Disabled Option' ]
  expect(allRadioButtonLabels).toContain("Disabled Option");

  // input value
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  await emailField.fill("test@test.com");
  const emailFieldValue = await emailField.inputValue();
  await expect(emailFieldValue).toEqual("test@test.com");
});

test("Assertions", async ({ page }) => {
  const buttonSubmit = page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .locator("button");

  // LOCATOR ASSERTION - locator to value | Default timeout: up to 5 sec
  expect(buttonSubmit).toBeVisible();

  // GENERAL ASSERTION - value to value | Default timeout: up to 30 sec
  const buttonText = await buttonSubmit.textContent();
  expect(buttonText).toEqual("Submit");

  // SOFT ASSERTION - test will be continued even if failed
  await expect.soft(buttonSubmit).toHaveText("Submit ? ");
  await buttonSubmit.click();
});
