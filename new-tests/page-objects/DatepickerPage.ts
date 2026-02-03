import { Locator, Page, expect } from "@playwright/test";

export class DatepickerPage {
  readonly page: Page;
  readonly commonCalendarInputField: Locator;
  readonly rangeCalendarInputField: Locator;

  constructor(page: Page) {
    this.page = page;
    this.commonCalendarInputField = page.getByPlaceholder("Form Picker");
    this.rangeCalendarInputField = page.getByPlaceholder("Range Picker");
  }

  // Common Datepicker
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    // open the calendar
    await this.commonCalendarInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday,
    );

    await expect(this.commonCalendarInputField).toHaveValue(dateToAssert);
  }

  // Datepicker With Range
  async selectDatePickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number,
  ) {
    await this.rangeCalendarInputField.click();
    const dateToAssertStart =
      await this.selectDateInTheCalendar(startDayFromToday);
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
  }

  // method to selecet single date in the calendar
  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday); // previous date
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectedYear = date.getFullYear();

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;
    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expetedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expetedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    // set the date
    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
