import { test } from "@playwright/test";
import { NavigationPage } from "../page-objects/NavigationPage";
import { FormLayoutsPage } from "../page-objects/FormLayoutsPage";
import { DatepickerPage } from "../page-objects/DatepickerPage";
import { fakerDE as faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/pages/iot-dashboard");
});

test("navigation across all pages ", async ({ page }) => {
  const navigation = new NavigationPage(page);
  await navigation.toFormLayoutsPage();
  await navigation.toDatepickerPage();
  await navigation.toSmartTablePage();
  await navigation.toToastrPage();
  await navigation.toTooltipPage();
});

test("parametrized methods. submit a form", async ({ page }) => {
  const navigation = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);

  // Generate test-data
  const fullName = faker.person.fullName();
  const email = faker.internet.email();
  const pass = faker.internet.password();

  await navigation.toFormLayoutsPage();
  await formLayoutsPage.submitUsingTheGridForm(email, pass, "Option 2");
  await formLayoutsPage.submitInlineForm(fullName, email, true);
});

test("test datepicker", async ({ page }) => {
  const navigation = new NavigationPage(page);
  const datepickerPage = new DatepickerPage(page);

  await navigation.toDatepickerPage();
  // test single date picker and range datepicker
  await datepickerPage.selectCommonDatePickerDateFromToday(10);
  await datepickerPage.selectDatePickerWithRangeFromToday(6, 10);
});
