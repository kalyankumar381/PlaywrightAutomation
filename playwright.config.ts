import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import os from 'os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


const reportConfig : OrtoniReportConfig={
  logo:"./logo.png",
  filename:"index.html",
  authorName:"Kalyan Kumar",
  base64Image:false,
  preferredTheme:"light",
  projectName:"Playwright Demo",
  testType:"Smoke"
}

const _reportPortalConfig={
  endpoint: "https://demo.reportportal.io/api/v1",
  
  apiKey: "y_XfJlAQCPRW27CPeNLW74j4PPjyHGJhJ25urcktKCA7yEB0OQI2c1Zxqu3aNQb72q",
  
  project: "default_personal",
  
  launch: "Yapse-Api Automation",
  
  description: "My awesome launch",
  
  attributes: [  
      {  
        key: "attributeKey",    
        value: "attrbiuteValue",  
      },  
      {  
        key:"System",
        value: os.hostname(),
      },
    ],
        mode: 'DEFAULT',
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  timeout:1*3*1000,
  expect:{
    timeout:5000
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: [['ortoni-report', reportConfig],['dot']],
  reporter:process.env.CI ? [['junit',{outputFile:"results.xml"}]]: [['ortoni-report', reportConfig],['dot'],['html',{open:'never'}],["json",{outputFile:"test-result.json"}],
            ['allure-playwright'],['@reportportal/agent-js-playwright', _reportPortalConfig]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    headless:process.env.CI ? true:false,
    screenshot:'on',
    viewport:null,
    launchOptions:{
      args:["--start-maximized"]
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      // use: { ...devices['Desktop Chrome'] },
  
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

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
