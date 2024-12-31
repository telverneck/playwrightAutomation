import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  name: 'Cocus Test',
  testDir: './tests',
  timeout: 40000,
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  outputDir: './test-results',
  use: {
    viewport: { width: 1920, height: 1080 },
    baseURL: 'https://www.premierman.com',
    headless: false,
    browserName: 'chromium',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        launchOptions: {
          slowMo: 1000
        }
      },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], 
        launchOptions: {
          slowMo: 1000
        }
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], 
        launchOptions: {
          slowMo: 1000
        }
      },
    },

    // Disabled By Default
    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
