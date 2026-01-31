import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test("tooltips", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  // Chrome browser > open Source tab in DevTools > press F8 button to freeze the DOM to inspect element and find a <tag>
  const tooltipCard = page.locator("nb-card", { hasText: "Colored Tooltips" });
  await tooltipCard.getByRole("button", { name: "WARNING" }).hover();

  //page.getByRole('tooltip') // if you have a role tooltip crated

  const tooltipText = await page.locator("nb-tooltip").textContent();
  expect(tooltipText).toEqual("This is a tooltip");
  await expect(page.locator("nb-tooltip")).toHaveCSS(
    "background-color",
    "rgb(255, 170, 0)",
  );
});
