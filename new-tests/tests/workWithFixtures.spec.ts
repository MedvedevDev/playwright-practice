import { base, expect } from "../test-options";
import { fakerDE as faker } from "@faker-js/faker";

base("parametrized methods. submit a form", async ({ formsObjectModel }) => {
  // Generate test-data
  const fullName = faker.person.fullName();
  const email = faker.internet.email();
  const pass = faker.internet.password();

  await formsObjectModel.submitUsingTheGridForm(email, pass, "Option 2");
  await formsObjectModel.submitInlineForm(fullName, email, true);
});

base("datepicker", async ({ datepickerObjectModel, page }) => {
  // open the calendar
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  // get all the elements that related to current month | previous month has different classes
  const currentMonth = page.locator('[class="day-cell ng-star-inserted"]');

  // pick a date in current month
  await currentMonth.getByText("1", { exact: true }).click();

  // make a string to compare
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const formatted = firstDayOfMonth.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  await expect(calendarInputField).toHaveValue(formatted);

  // make a screenshot
  await page.screenshot({
    path: "screenshots/datePicker.png",
    animations: "disabled",
  });
});
