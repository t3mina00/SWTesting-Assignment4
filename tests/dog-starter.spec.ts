import { test, expect } from '@playwright/test';

test.describe('Dog image retrieved successfully when page is loaded', () => {
    test('should retrieve dog image successfully when page is loaded', async({ page }) => {
        await page.goto('/');

        const responsePromise = page.waitForResponse('**/api/dogs/random');

        await responsePromise;

        const image = page.getByRole('img');
        const src = await image.getAttribute('src');
        
        expect(src).toBeTruthy();
        expect(src).toMatch(/^https:\/\//);
    })
})

test.describe('Dog image retrieved successfully when button is clicked', () => {
    test('should retrieve dog image successfully when button is clicked', async({ page }) => {
        await page.goto('/');

        const responsePromise = page.waitForResponse('**/api/dogs/random');

        await page.getByRole('button', { name: 'Get Another Dog' }).click();
        
        await responsePromise;

        const image = page.getByRole('img');
        const src = await image.getAttribute('src');
        
        expect(src).toBeTruthy();
        expect(src).toMatch(/^https:\/\//);
    })
})

test.describe('Error handling when API call fails', () => {
    test('should display error message when API call fails', async({ page }) => {
        await page.route('**/api/dogs/random', async(route) => {
            await route.abort();
        });

        await page.goto('/');

        const errorElement = page.getByText(/Error: .+/);
        
        await expect(errorElement).toBeVisible();
        expect(await errorElement.isVisible()).toBe(true);
    })
})