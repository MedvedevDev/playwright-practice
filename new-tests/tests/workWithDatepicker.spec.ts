import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pages/iot-dashboard");
});

test("datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker ").click();

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

test("[ONLY within the current month] dynamically select a date in the datepicker", async ({
  page,
}) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker ").click();

  // open the calendar
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() - 1); // previous date
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedYear = date.getFullYear();

  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  // get all the elements that related to current month | previous month has different classes
  const currentMonth = page.locator('[class="day-cell ng-star-inserted"]');

  // set the date
  await currentMonth.getByText(expectedDate, { exact: true }).click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});

test("dynamically select a date in the datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker ").click();

  // open the calendar
  const calendarInputField = page.getByPlaceholder("Form Picker");
  await calendarInputField.click();

  let date = new Date();
  date.setDate(date.getDate() + 14); // previous date
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
  const expectedYear = date.getFullYear();

  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();
  const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
  const expetedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
  while (!calendarMonthAndYear.includes(expetedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }

  // set the date
  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();
  await expect(calendarInputField).toHaveValue(dateToAssert);
});
