import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define a custom fixture type
type TestFixtures = {
    credentials: {
    username: string;
    password: string;
    };
};

// Extend the base test with the custom fixture
export const test = base.extend<TestFixtures>({
    credentials: async ({}, use) => {
    // Get sensitive data from environment variables
    const username = process.env.LOGIN_USERNAME || 'default_username';
    const password = process.env.LOGIN_PASSWORD || 'default_password';

    // Pass the credentials data to the test
    await use({ username, password });
    },
});

// Re-export 'expect' from Playwright
export { expect };
