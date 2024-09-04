import { ReporterDescription } from "playwright/test";
import { Constants } from "./constants";
import { LiteralUnion } from "type-fest";

export class ReportPortalAgent{

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    /**
      * Parses the given input environment vars for Report Portal and creates config for the Report Portal Playwright agent
      * @returns Report Portal config object
    */

    private static getRPconfig() {
        if (!Constants.GLOBAL_RP_DISABLE) {
            if (process.env.CI !== undefined || Constants.GLOBAL_RP_LOCAL_ENABLE) {
                // eslint-disable-next-line @typescript-eslint/ban-types
                console.log("<><><><><> RP-END point>>>>>>>>>>>>>>>>>> :: "+ Constants.GLOBAL_RP_ENDPOINT);
                
                const launchTags: Object[] = Constants.getRpTags();
                const rpConfig = {
                    token: Constants.GLOBAL_RP_TOKEN,
                    endpoint: Constants.GLOBAL_RP_ENDPOINT,
                    project: Constants.GLOBAL_PROJECT,
                    launch: Constants.GLOBAL_SUITE_NAME,
                    attributes: launchTags,
                    description: Constants.GLOBAL_SUITE_DESC,
                    includeTestSteps: Constants.GLOBAL_RP_INCLUDE_STEP_LOGS,
                    debug: Constants.GLOBAL_RP_DEBUG,
                    uploadTrace: Constants.GLOBAL_RP_UPLOAD_TRACE,
                    uploadVideo: Constants.GLOBAL_RP_UPLOAD_VIDEO,
                    includePlaywrightProjectNameToCodeReference: true,
                };
                console.log('Report Portal config set-up');
                return rpConfig;
            } else {
                console.log('Local run not publishing the result to Report Portal!');
            }
        } else {
            console.log('PWG_ENV_RP_DISABLE set to true not publishing the result to Report Portal!');
        }
    }

 /**
     * This method enables user to integrate Report Portal for playwright tests.
     * Below are the mandatory environment variables which user needs to set for RP integration.
     * PWG_ENV_PROJECT - Project Name
     * PWG_ENV_SUITE_NAME - Suite Name (launch name in Report Portal.)
     * @returns Playwright supported reporter,
     */
 static reporter():
//  type LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription[]{});
 LiteralUnion<'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html', string> | ReporterDescription[] {
     if (Constants.GLOBAL_RP_DISABLE) {
         console.log('PWG_ENV_RP_DISABLE set to true not publishing the result to RP! and using html reporter.');
         return [['html', { open: 'never' }]];
     } else {
         return [['html', { open: 'never' }], ['junit', { outputFile: 'junit-report\\junit-results.xml' }], ['@reportportal/agent-js-playwright', this.getRPconfig()]];
     }
 }    
}