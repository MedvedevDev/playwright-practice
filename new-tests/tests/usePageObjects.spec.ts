import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/NavigationPage";
import { FormLayoutsPage } from "../page-objects/FormLayoutsPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("navigation across all pages ", async ({ page }) => {
  const navigation = new NavigationPage(page);
  await navigation.formLayoutsPage();
  await navigation.datepickerPage();
  await navigation.smartTablePage();
  await navigation.toastrPage();
  await navigation.tooltipPage();
});

test("parametrized methods. submit a form", async ({ page }) => {
  const navigation = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);

  await navigation.formLayoutsPage();
  await formLayoutsPage.submitUsingTheGridForm(
    "assaas@sasa.s",
    "sdfdgdsffsdf",
    "Option 2",
  );
  await formLayoutsPage.submitInlineForm("Alex Manad", "fdsfsdfs@fdfsd.", true);
});
