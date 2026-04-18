import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('loads home page successfully', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/MyYogaTeacher/)
  })

  test('shows hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /Find Your Perfect/i })).toBeVisible()
  })

  test('shows stats section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('200K+')).toBeVisible()
    await expect(page.getByText('Active Students')).toBeVisible()
  })

  test('shows features section', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Why MyYogaTeacher?')).toBeVisible()
  })

  test('browse teachers button navigates to teachers page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /Browse Teachers/i }).click()
    await expect(page).toHaveURL('/teachers')
  })

  test('navbar is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: /main navigation/i })).toBeVisible()
  })

  test('footer is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('contentinfo')).toBeVisible()
  })

  test('sign in button is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })
})
