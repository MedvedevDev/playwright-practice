import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/NavigationPage";
import { FormLayoutsPage } from "../page-objects/FormLayoutsPage";
import { DatepickerPage } from "../page-objects/DatepickerPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
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

  await navigation.toFormLayoutsPage();
  await formLayoutsPage.submitUsingTheGridForm(
    "assaas@sasa.s",
    "sdfdgdsffsdf",
    "Option 2",
  );
  await formLayoutsPage.submitInlineForm("Alex Manad", "fdsfsdfs@fdfsd.", true);
});

test("test datepicker", async ({ page }) => {
  const navigation = new NavigationPage(page);
  const datepickerPage = new DatepickerPage(page);

  await navigation.toDatepickerPage();
  await datepickerPage.selectCommonDatePickerDateFromToday(10);

  await datepickerPage.selectDatePickerWithRangeFromToday(6, 10);
});
