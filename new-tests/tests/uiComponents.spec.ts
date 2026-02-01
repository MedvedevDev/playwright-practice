import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
});

test.describe("Form Latouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });
    const usingTheGridPasswordInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Password" });

    await usingTheGridEmailInput.fill("thisisemail@test.te");
    // await usingTheGridPasswordInput.pressSequentially("Password", {
    //   delay: 500,
    // });

    // extract value
    const emailValue = await usingTheGridEmailInput.inputValue();
    // generic assertion
    expect(emailValue).toEqual("thisisemail@test.te");
    // locator assertion
    await expect(usingTheGridEmailInput).toHaveValue("thisisemail@test.te");
  });

  test("radio buttons", async ({ page }) => {
    const usingTheGrid = page.locator("nb-card", { hasText: "Using the Grid" });

    // getByLabel
    await usingTheGrid.getByLabel("Option 1").check({ force: true }); //because it has visually-hidden property

    // getByRole
    await usingTheGrid
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    // GENERIC assertion for radio button
    const radioStatus = await usingTheGrid
      .getByRole("radio", { name: "Option 2" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    // LOCATOR assertion for radio button
    await expect(
      usingTheGrid.getByRole("radio", { name: "Option 2" }),
    ).not.toBeChecked();
  });
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  // click  - works for checked & uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .click({ force: true }); //because it has visually-hidden property

  // check  - works only for uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  // uncheck  - works only for uncheked checkboxes
  await page
    .getByRole("checkbox", { name: "Show toast with icon" })
    .uncheck({ force: true });

  // get ALL checkboxes and verify that all are checked
  const allChboxs = page.getByRole("checkbox");

  for (const box of await allChboxs.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }
});

test("list and dropdown", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();

  // getByRole('list') --> when the list has <ul> tag
  // getByRole('listitem') --> when the list has <li> tag

  //const optionList = page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option"); //array returned
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  await optionList.filter({ hasText: "Cosmic" }).click(); // select another theme color

  // verify that theme color is changed to Cosmic
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("backgroun d-color", "rgb(50, 50, 89)");
});

test("dialog box and tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // catch the window dialog with listener
  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });

  // locate  and press the trash icon for Specific table row | get the row by any text
  await page
    .getByRole("table")
    .locator("tr", { hasText: "ann@gmail.com" })
    .locator(".nb-trash")
    .click();

  // check that the row is deleted in the tabla
  // await expect(
  //   page.getByRole("table").getByText("ann@gmail.com"),
  // ).not.toBeVisible();

  // check through all the table
  //const allRows = page.getByRole("table").locator("tr");
  // OR ->
  const allRows = page.getByRole("row");
  const rowsCount = await allRows.count();

  let emailFound = false;

  for (let i = 0; i < rowsCount; i++) {
    const text = await allRows.nth(i).innerText();
    if (text.includes("ann@gmail.com")) {
      emailFound = true;
      break;
    }
  }

  expect(emailFound).toBeFalsy();
});

test("update data in the table by unique text", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // fint the row by text
  const targetRow = page.getByRole("row", { name: "ruben@gmail.com" });
  // press the edit button
  await targetRow.locator(".nb-edit").click();

  // set new age and data
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("199");
  await page.locator("input-editor").getByPlaceholder("First Name").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("First Name")
    .fill("NEW NAME");
  await page.locator(".nb-checkmark").click();
});

test("update data in the table by specific row and column (not unique text)", async ({
  page,
}) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // navigate to the specific page
  await page
    .locator("nav.ng2-smart-pagination-nav")
    .getByRole("link", { name: "2" })
    .click();

  // getByRole('row', {name: '11'}) -> found 2 results -> filter by a column nth(1) -> search in this column (not the whole table) by the text
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });

  // update the data
  await targetRowById.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("thisisnewemail@am.am");
  await page.locator(".nb-checkmark").click();

  // verify that email is updated
  await expect(targetRowById.locator("td").nth(5)).toHaveText(
    "thisisnewemail@am.am",
  );
});

test("test filter of the table", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // verify that the table is updated according to the age
  const ages = ["20", "30", "40", "200"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500); // table doesn't have time to render with new data before going to next loop; we need to create an artificial timeout

    const ageRows = page.locator("tbody tr");
    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();

      // check negative scenario for age == 200
      if (age === "200") {
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found",
        );
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
});

test("sliders update attribute", async ({ page }) => {
  const tempDragger = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger circle',
  );
  await tempDragger.evaluate((node) => {
    node.setAttribute("cx", "232.630");
    node.setAttribute("cy", "232.630");
  });
  await tempDragger.click();
});

test("sliders mouse movement", async ({ page }) => {
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger',
  );
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();

  await expect(tempBox).toContainText("30");
});
