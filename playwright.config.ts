import { defineConfig, devices } from '@playwright/test';
import { OrtoniReportConfig } from 'ortoni-report';
import os from 'os';
import {ReportPortalAgent} from './src/rp-agents';
import { Constants } from './src/constants';

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
const rpTags = process.env.PWG_ENV_RP_TAGS ? JSON.parse(process.env.PWG_ENV_RP_TAGS) : {};
const _reportPortalConfig={
  // endpoint: "https://demo.reportportal.io/api/v1",  
  // apiKey: Constants.GLOBAL_RP_TOKEN,  
  // project: "default_personal",  
  // launch: "Yapse-Api Automation",  
  // description: "My awesome launch",
  // attributes: Constants.getRpTags(),
  

  token: Constants.GLOBAL_RP_TOKEN,
  endpoint: Constants.GLOBAL_RP_ENDPOINT,
  project: Constants.GLOBAL_PROJECT,
  launch: Constants.GLOBAL_SUITE_NAME,
  // attributes: Constants.getRpTags(),
  description: Constants.GLOBAL_SUITE_DESC,
  
  // attributes: [  
  //     {  
  //       key: "attributeKey",    
  //       value: "attrbiuteValue",  
  //     },  
  //     {  
  //       key:"System",
  //       value: os.hostname(),
  //     },
  //   ],
  attributes : [
    ...Object.entries(rpTags).map(([key, value]) => ({ key, value })), // Spread rpTags into key-value pairs
    {
      key: "System",
      value: os.hostname(),
    }
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
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  // reporter: [['ortoni-report', reportConfig],['dot']],
  reporter: process.env.CI ? [['junit',{outputFile:'results.xml'}],['@reportportal/agent-js-playwright', _reportPortalConfig]]:[['ortoni-report', reportConfig],['dot'],['html',{open:'never'}],["json",{outputFile:"test-result.json"}],
            ['allure-playwright'],['./src/custom-report.ts']],
  
  // reporter: process.env.CI ? [['junit',{outputFile:'results.xml'}],['@reportportal/agent-js-playwright', _reportPortalConfig]]:[['ortoni-report', reportConfig],['dot'],['html',{open:'never'}],["json",{outputFile:"test-result.json"}],
  //           ['allure-playwright'],['@reportportal/agent-js-playwright', _reportPortalConfig],['./src/custom-report.ts']],            
  // reporter: [['ortoni-report', reportConfig],['dot'],['html',{open:'never'}],["json",{outputFile:"test-result.json"}],
  // ['allure-playwright'],['@reportportal/agent-js-playwright', ReportPortalAgent.reporter()]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    headless:process.env.CI ? true:true,
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
