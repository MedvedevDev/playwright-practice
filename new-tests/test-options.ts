import test from "@playwright/test";
import { FormLayoutsPage } from "./page-objects/FormLayoutsPage";
import { DatepickerPage } from "./page-objects/DatepickerPage";

export type TestOptions = {
  navigateToForms: string;
  formsObjectModel: FormLayoutsPage;
  navigateToDatepicker: string;
  datepickerObjectModel: DatepickerPage;
};

// {auto: true} -> option to run the fixture before beforeEach and beforeAll hooks
export const base = test.extend<TestOptions>({
  navigateToForms: async ({ page }, use) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
    await use("");
  },

  formsObjectModel: async ({ page, navigateToForms }, use) => {
    const f = new FormLayoutsPage(page);
    await use(f);
  },

  navigateToDatepicker: async ({ page }, use) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Datepicker").click();
    await use("");
  },

  datepickerObjectModel: async ({ page, navigateToDatepicker }, use) => {
    const dp = new DatepickerPage(page);
    await use(dp);
  },

  //   formLayoutsPage: async ({ page }, use) => {
  //     const formPage = new FormLayoutsPage(page);
  //     await page.goto("/");
  //     await page.getByText("Forms").click();
  //     await page.getByText("Form Layouts").click();
  //     await use(formPage);
  //   },

  //   datepickerPage: async ({ page }, use) => {
  //     const datePage = new DatepickerPage(page);
  //     await page.goto("/");
  //     await page.getByText("Forms").click();
  //     await page.getByText("Datepicker").click();
  //     await use(datePage);
  //   },
});

export { expect } from "@playwright/test";
