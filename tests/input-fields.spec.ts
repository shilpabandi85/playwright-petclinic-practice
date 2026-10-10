import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

test.beforeEach( async({page}) => {
  await page.goto('/')
})

/**This test will login to home page and validate the text */
test('1. Home page Validation', async ({page}) => {
  await expect(page.locator('.title')).toHaveText('Welcome to Petclinic')
});


/**This test will validate to Pet Types page validate the heading.
 * Check for the first pet name , edit it.
 * Re-check the updated value is reflecting
 */
test('2. Edit Pet Type Cat', async ({page}) => {
  await page.getByRole('link', { name: 'Pet Types' }).click()
  await expect(page.getByRole('heading', { name: 'Pet Types' })).toBeVisible()
  await page.locator('[id="0"]').click();
  await expect(page.locator('[id="0"]')).toHaveValue('cat')
  
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.locator('#name').click();
  await page.locator('#name').fill('rabbit');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.locator('[id="0"]')).toHaveValue('rabbit')
});


/**This test will revert the changes done in test 2 back to original value.
 * Re-check the updated value is reflecting
 */
test('3. Updating Pet Type back to Cat', async ({page}) => {
  await page.getByRole('link', { name: 'Pet Types' }).click();
  await page.getByRole('heading', { name: 'Pet Types' }).click();
  await page.locator('[id="0"]').click();
  await expect(page.locator('[id="0"]')).toHaveValue('rabbit')
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.locator('#name').click();
  await page.locator('#name').fill('cat');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.locator('[id="0"]')).toHaveValue('cat')
});