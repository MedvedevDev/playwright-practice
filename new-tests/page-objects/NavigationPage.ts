import { Locator, Page } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly formLayoutsMenu: Locator;
  readonly datepickerMenu: Locator;
  readonly smartTableMenu: Locator;
  readonly toastrMenu: Locator;
  readonly tooltipMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formLayoutsMenu = page.getByText("Form Layouts");
    this.datepickerMenu = page.getByText("Datepicker");
    this.smartTableMenu = page.getByText("Smart Table");
    this.toastrMenu = page.getByText("Toastr");
    this.tooltipMenu = page.getByText("Tooltip");
  }

  async toFormLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.formLayoutsMenu.click();
  }

  async toDatepickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.datepickerMenu.click();
  }

  async toSmartTablePage() {
    await this.page.getByText("Tables & Data").click();
    await this.smartTableMenu.click();
  }

  async toToastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.toastrMenu.click();
  }

  async toTooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.tooltipMenu.click();
  }

  // helper method
  private async selectGroupMenuItem(groupTitle: string) {
    const groupMenu = this.page.getByTitle(groupTitle);
    const expandedState = await groupMenu.getAttribute("aria-expanded");
    if (expandedState === "false") {
      await groupMenu.click();
    }
  }
}
