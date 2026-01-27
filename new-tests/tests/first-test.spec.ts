import { test } from "@playwright/test";

test.beforeEach("go to localhost", async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("firms suite", () => {
  test.beforeEach("click forms", async ({ page }) => {
    await page.getByText("Forms").click();
  });

  test("test 1", async ({ page }) => {
    await page.getByText("Form Layouts").click();
  });

  test("test 2", async ({ page }) => {
    await page.getByText("Datepicker").click();
  });
});
