import { test, expect } from '@playwright/test'

test.describe('Teachers Page', () => {
  test('loads teachers page', async ({ page }) => {
    await page.goto('/teachers')
    await expect(page.getByRole('heading', { name: /Browse Teachers/i })).toBeVisible()
  })

  test('shows filter sidebar', async ({ page }) => {
    await page.goto('/teachers')
    await expect(page.getByRole('complementary', { name: /filter teachers/i })).toBeVisible()
  })

  test('shows available only checkbox', async ({ page }) => {
    await page.goto('/teachers')
    await expect(page.getByRole('checkbox', { name: /available only/i })).toBeVisible()
  })

  test('shows clear filters button', async ({ page }) => {
    await page.goto('/teachers')
    await expect(page.getByRole('button', { name: /clear filters/i })).toBeVisible()
  })
})
