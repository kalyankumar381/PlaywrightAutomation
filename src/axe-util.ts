import AxeBuilder from '@axe-core/playwright';
import { Page, TestInfo } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';
import { Constants } from './constants';
import { StringBuilder } from './string-builder';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { request, ApiRequestContext } = require('@playwright/test');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const uaParser = require('ua-parser-js');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs/promises');
export class AxeUtil {
    readonly testInfo: TestInfo;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor(testInfo: TestInfo) {
        this.testInfo = testInfo;
    }

    /**
     * Method to scan the current page for the accessibility violation using axe-core engine.
     * Generates the violation report in the form of json and html.
     * @param page The playwright {page} fixture.
     * @param pageName The logical page name or element name for the current page or current element. This needs to be unique for the given tests.
     * @param cssSelector The css Selector/Selectors to scan specific part of the page
     *  @example
     * Example 1: Complete page scan
     * test("TestAccessibility@regression", async ({ page, global}) => {
     * await page.goto("http://rxtesting.yappes-enterprise.com/login/api-manager");
     * await global.axeUtil.scan(page, "API Manager");//PI Manager is the page name
     * });
     *
     * @example
     * Example 2: Scanning specific part of the page
     * test("TestAccessibility@regression", async ({ page, global}) => {
     * await page.goto("http://rxtesting.yappes-enterprise.com/login/api-manager/");
     * await global.axeUtil.scan(page, 'PromoContent', '#promo-148061 > div > div.promo-content.col-md-8.d-flex.flex-md-row');//Here we have passed the element name and selector
     * });
     *
     *
     */
    async scan(page: Page, pageName: string, cssSelector?: string[] | string) {
        if (Constants.GLOBAL_AXE_SCAN_ENABLE) {
            const getUA = await page.evaluate(() => navigator.userAgent);
            const userAgentInfo = uaParser(getUA);
            const configProjectName = this.testInfo.project.name;
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const testClassFileName = require('path').parse(this.testInfo.file).base;
            const testCase = this.testInfo.title;
            const browser = userAgentInfo.browser.name;
            const axeReportpath = configProjectName.length === 0 ?
                'axe-reports/' + Constants.GLOBAL_SUITE_FOLDER_NAME + '/' + testClassFileName + '/' + testCase + '-' + browser :
                'axe-reports/' + Constants.GLOBAL_SUITE_FOLDER_NAME + '/' + configProjectName + '/' + testClassFileName + '/' + testCase + '-' + browser;
            const axeBuilder = new AxeBuilder({ page });
            if (cssSelector === undefined) {
                axeBuilder.withTags(Constants.GLOBAL_AXE_CUSTOM_TAGS);
                // axeBuilder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
                try {
                    const excludedSelectors = JSON.parse(process.env.PWG_ENV_AXE_EXCLUDE || '');
                    if (typeof excludedSelectors === 'object') {
                        for (let i = 0; i < excludedSelectors.length; i++) {
                            axeBuilder.exclude(excludedSelectors[i]);
                        }
                    }
                } catch (e) {
                    axeBuilder.exclude(Constants.GLOBAL_AXE_EXCLUDE);
                }
                axeBuilder.disableRules(Constants.GLOBAL_AXE_DISABLE_RULES);
            } else {
                pageName = pageName + '_Element';
                axeBuilder.withTags(Constants.GLOBAL_AXE_CUSTOM_TAGS);
                // axeBuilder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);
                try {
                    const excludedSelectors = JSON.parse(process.env.PWG_ENV_AXE_EXCLUDE || '');
                    if (typeof excludedSelectors === 'object') {
                        for (let i = 0; i < excludedSelectors.length; i++) {
                            axeBuilder.exclude(excludedSelectors[i]);
                        }
                    }
                } catch (e) {
                    axeBuilder.exclude(Constants.GLOBAL_AXE_EXCLUDE);
                }
                if (typeof cssSelector !== 'string') {
                    for (let i = 0; i < cssSelector.length; i++) {
                        axeBuilder.include(cssSelector[i]);
                    }
                }
                else {
                    axeBuilder.include(cssSelector);
                }
                axeBuilder.disableRules(Constants.GLOBAL_AXE_DISABLE_RULES);
            }
            await axeBuilder.analyze()
                .then(axeResults => {
                    (() => {
                        createHtmlReport({
                            results: axeResults,
                            options: {
                                projectKey: Constants.GLOBAL_PROJECT,
                                outputDir: axeReportpath,
                                reportFileName: pageName + '.html',
                            }
                        });
                    })();

                    (async () => {
                        try {
                            await fs.writeFile(axeReportpath + '/' + pageName + '.json', JSON.stringify(axeResults));
                        } catch (err) {
                            console.error(err);
                        }

                    })();
                    // Push axe data to ES
                    (async () => {
                        if (Constants.GLOBAL_ES_DATA) {
                            if (process.env.CI !== undefined) {
                                const baseJson: any = {};
                                //framework details
                                baseJson.Browser = userAgentInfo.browser.name;
                                baseJson.BrowserVersion = userAgentInfo.browser.version;
                                // axe testEngine details
                                baseJson.testEngine_name = axeResults.testEngine.name;
                                baseJson.testEngine_version = axeResults.testEngine.version;
                                // axe testEnvironment details
                                baseJson.testEnvironment_name = axeResults.testEnvironment.userAgent;
                                baseJson.testEngine_windowWidth = axeResults.testEnvironment.windowWidth;
                                baseJson.testEngine_windowHeight = axeResults.testEnvironment.windowHeight;
                                baseJson.testEngine_orientationAngle = axeResults.testEnvironment.orientationAngle;
                                baseJson.testEngine_orientationType = axeResults.testEnvironment.orientationType;
                                // axe testRunner details
                                baseJson.testRunner_name = axeResults.testRunner.name;
                                baseJson.url = axeResults.url;
                                baseJson.timestamp = axeResults.timestamp;
                                // axe violation details
                                this.getPropertiesFromAxeJsonResultArray(axeResults, 'violations', baseJson);
                                // axe incomplete details
                                this.getPropertiesFromAxeJsonResultArray(axeResults, 'incomplete', baseJson);

                            }
                        }
                    })();


                }).catch((error) => {
                    console.error('Error while scanning for accessibility violations:', error.message);
                });

        }
    }
    /**
     * Method to get axe json Result array for the result type violations and incomplete.
     * @param coreJsonObject Axe results.
     * @param resultArrayType The type of array - violations or incomplete.
     * @param appendingJsonObject Violation details.
     */
    async getPropertiesFromAxeJsonResultArray(coreJsonObject: any, resultArrayType: string, appendingJsonObject: any) {
        const violationsBody = new StringBuilder();
        const allResultsArray: any[] = [];
        if (resultArrayType === 'violations') {
            coreJsonObject = coreJsonObject.violations;
        }
        else if (resultArrayType === 'incomplete') {
            coreJsonObject = coreJsonObject.incomplete;
        }

        if (coreJsonObject !== null && coreJsonObject.length > 0) {
            for (let i = 0; i < coreJsonObject.length; i++) {
                const vJsonObject = appendingJsonObject;
                vJsonObject.v_description = coreJsonObject[i].description;
                vJsonObject.v_help = coreJsonObject[i].help;
                vJsonObject.v_helpUrl = coreJsonObject[i].helpUrl;
                vJsonObject.v_id = coreJsonObject[i].id;
                vJsonObject.v_impact = coreJsonObject[i].impact;
                vJsonObject.v_tags = coreJsonObject[i].tags;
                const resultNodes = coreJsonObject[i].nodes;

                if (resultNodes !== null && resultNodes.length > 0) {
                    //Getting launchtags and converting it to map
                    const launchTags: any = Constants.getRpTags();
                    const array = launchTags;
                    const tags = Object.fromEntries(
                        array.map((e: { key: any; value: any; }) => [e.key, e.value])
                    );

                    for (let i = 0; i < resultNodes.length; i++) {
                        const nodeJsonObject: any = {};
                        nodeJsonObject.v_node_html = resultNodes[i].html;
                        nodeJsonObject.v_node_impact = resultNodes[i].impact;
                        nodeJsonObject.v_node_target = resultNodes[i].target;
                        const anyArray = resultNodes[i].any;
                        const customArray: any = [];
                        for (let i = 0; i < anyArray.length; i++) {
                            const myAny: any = {};
                            myAny.id = anyArray[i].id;
                            myAny.impact = anyArray[i].impact;
                            myAny.message = anyArray[i].message;
                            myAny.relatedNodes = anyArray[i].relatedNodes;
                            customArray.push(myAny);

                        }
                        nodeJsonObject.v_node_any = customArray;
                        nodeJsonObject.v_node_all = resultNodes[i].all;
                        nodeJsonObject.v_node_none = resultNodes[i].none;
                        if (resultArrayType === 'incomplete') {
                            nodeJsonObject.v_node_needsReview = true;
                        }
                        const mergedJson = Object.assign(nodeJsonObject, vJsonObject, tags);
                        allResultsArray.push(mergedJson);

                    }
                }
            }

            const createMetaData = '{"create":{}}';
            let i = 1;
            for (const violation of allResultsArray) {
                violationsBody.writeln(createMetaData);
                violationsBody.writeln(JSON.stringify(violation).toString());
                i++;
            }
            const data = violationsBody.toString();
            const indexName = Constants.GLOBAL_ES_INDEX ;
            const ENDPOINT = Constants.GLOBAL_ES_ENDPOINT;
            let apiContext = ApiRequestContext;
            apiContext = await request.newContext();
            apiContext = await request.newContext();
            const resource = ENDPOINT + indexName + '/_bulk';
            try {
                const launchResponse = await apiContext.post(resource, {

                    headers: {

                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    data: data
                });
            }
            catch (error) {
                console.log(error);
                console.log('Something went wrong while inserting data to Elastic search');
            }

        }
    }
}




