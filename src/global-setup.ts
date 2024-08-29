
import { FullConfig } from '@playwright/test';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function globalSetup(config: FullConfig) {
    console.log('----------globalSetup started----------');
}

export default globalSetup;
