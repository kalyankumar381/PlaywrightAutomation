/* eslint-disable no-console */
import { test as base, expect } from '@playwright/test';
import { GlobalUtil } from './global-util';
import { Constants } from './constants';

type globalHooks = {
    global: GlobalUtil;
}

const globalFixtures = base.extend<globalHooks>({

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    global: async ({ page, locale, request }, use, testInfo) => {
        const globalUtil = new GlobalUtil(page, request, testInfo);
        await use(globalUtil);
    },
});

export const test = globalFixtures;
