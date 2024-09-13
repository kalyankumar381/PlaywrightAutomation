import { Utils } from './utils';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import dotenvExpand from 'dotenv-expand';
import { env } from 'node:process';
import os from 'os';
let customTags: string | string[];
let disableRules: string | string[];

if (_.isUndefined(process.env.PWG_ENV_FILEPATH)) {
    dotenvExpand.expand(dotenv.config({ path: process.cwd() + '/.env' }));
    console.log('Reading environment variables from .env file');
} else {
    dotenv.config({ path: process.cwd() + process.env.PWG_ENV_FILEPATH });
    dotenvExpand.expand(dotenv.config({ path: process.cwd() + '/' + process.env.PWG_ENV_FILEPATH }));
    console.log('Reading environment variables from :' + process.env.PWG_ENV_FILEPATH);
}




export class Constants {
    //*****************************Generic framework global constants*****************************
    static readonly GLOBAL_SEPARATOR: string = '@@';
    static readonly GLOBAL_PROJECT = process.env.PWG_ENV_PROJECT  || 'PlaywrightAutomation';
    static readonly GLOBAL_SUITE_NAME = process.env.PWG_ENV_SUITE_NAME;
    static readonly GLOBAL_SUITE_DESC = (_.isUndefined(process.env.PWG_ENV_SUITE_DESC) || _.isEmpty(process.env.PWG_ENV_SUITE_DESC)) ?
        process.env.PWG_ENV_SUITE_NAME + ' tests' : process.env.PWG_ENV_SUITE_DESC;
    // static readonly GLOBAL_SUITE_FOLDER_NAME = this.getCurrentSuiteTimeStamp();
 

    //*****************************Report Portal*****************************
    static readonly GLOBAL_RP_DISABLE: boolean = (_.isUndefined(process.env.PWG_ENV_RP_DISABLE) || _.isEmpty(process.env.PWG_ENV_RP_DISABLE))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_DISABLE);
    static readonly GLOBAL_RP_ENDPOINT: string = 'https://demo.reportportal.io/api/v1';
    static readonly GLOBAL_RP_TOKEN: string = 'y_DVqN3GMRSGq9zQSPZsap29lwiOrQazYm-m3B56j5aev42LEUErU28qYewLqZcKaG';
    static readonly GLOBAL_RP_LOCAL_ENABLE: boolean = (_.isUndefined(process.env.PWG_ENV_RP_LOCAL_ENABLE) || _.isEmpty(process.env.PWG_ENV_RP_LOCAL_ENABLE))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_LOCAL_ENABLE);
    // eslint-disable-next-line @typescript-eslint/ban-types
    // static readonly GLOBAL_RP_TAGS: Object[] = this.getRpTags();
    static readonly GLOBAL_RP_INCLUDE_STEP_LOGS: boolean = (_.isUndefined(process.env.PWG_ENV_RP_INCLUDE_STEP_LOGS) || _.isEmpty(process.env.PWG_ENV_RP_INCLUDE_STEP_LOGS))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_INCLUDE_STEP_LOGS);
    static readonly GLOBAL_RP_UPLOAD_TRACE: boolean = (_.isUndefined(process.env.PWG_ENV_RP_UPLOAD_TRACE) || _.isEmpty(process.env.PWG_ENV_RP_UPLOAD_TRACE))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_UPLOAD_TRACE);
    static readonly GLOBAL_RP_UPLOAD_VIDEO: boolean = (_.isUndefined(process.env.PWG_ENV_RP_UPLOAD_VIDEO) || _.isEmpty(process.env.PWG_ENV_RP_UPLOAD_VIDEO))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_UPLOAD_VIDEO);
    static readonly GLOBAL_RP_DEBUG: boolean = (_.isUndefined(process.env.PWG_ENV_RP_DEBUG) || _.isEmpty(process.env.PWG_ENV_RP_DEBUG))
        ? false : Utils.booleanfy(process.env.PWG_ENV_RP_DEBUG);

    //*****************************Accessibility*****************************
    static readonly GLOBAL_AXE_SCAN_ENABLE: boolean = (_.isUndefined(process.env.PWG_ENV_AXE_SCAN_ENABLE) || _.isEmpty(process.env.PWG_ENV_AXE_SCAN_ENABLE))
        ? false : Utils.booleanfy(process.env.PWG_ENV_AXE_SCAN_ENABLE);
    static readonly GLOBAL_AXE_CUSTOM_TAGS: string | string[] = (_.isUndefined(process.env.PWG_ENV_AXE_CUSTOM_TAGS) || _.isEmpty(process.env.PWG_ENV_AXE_CUSTOM_TAGS))
        ? ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] : customTags;
    static readonly GLOBAL_AXE_EXCLUDE: string | string[] = (_.isUndefined(process.env.PWG_ENV_AXE_EXCLUDE) || _.isEmpty(process.env.PWG_ENV_AXE_EXCLUDE))
        ? [] : _.toString(process.env.PWG_ENV_AXE_EXCLUDE);
    static readonly GLOBAL_AXE_DISABLE_RULES: string | string[] = (_.isUndefined(process.env.PWG_ENV_AXE_DISABLE_RULES) || _.isEmpty(process.env.PWG_ENV_AXE_DISABLE_RULES))
        ? [] : disableRules;


    //*****************************Axe data integration with Elastic Search*****************************
    static readonly GLOBAL_ES_DATA: boolean = (_.isUndefined(process.env.PWG_ENV_PUSH_AXE_DATA_TO_ES) || _.isEmpty(process.env.PWG_ENV_PUSH_AXE_DATA_TO_ES))
        ? true : Utils.booleanfy(process.env.PWG_ENV_PUSH_AXE_DATA_TO_ES);



    //*********************** ALM *******************/
    static readonly GLOBAL_UPDATE_ALM : boolean = (_.isUndefined(process.env.PWG_ENV_ALM) || _.isEmpty(process.env.PWG_ENV_ALM))
        ? false : Utils.booleanfy(process.env.PWG_ENV_ALM);
    static readonly GLOBAL_ALM_PROJECT_ID: string = (_.isUndefined(process.env.PWG_ENV_ALM_PROJECT_ID) || _.isEmpty(process.env.PWG_ENV_ALM_PROJECT_ID))
        ? '' : _.toString(process.env.PWG_ENV_ALM_PROJECT_ID);
    static readonly GLOBAL_TEST_SET_ID:string=(_.isUndefined(process.env.PWG_ENV_TEST_SET_ID) || _.isEmpty(process.env.PWG_ENV_TEST_SET_ID))
        ? '' : _.toString(process.env.PWG_ENV_TEST_SET_ID);

    //*********************** Email ******************************************
    static readonly GLOBAL_SEND_EMAIL: boolean = (_.isUndefined(process.env.PWG_SEND_EMAIL) || _.isEmpty(process.env.PWG_SEND_EMAIL))
        ? false : Utils.booleanfy(process.env.PWG_SEND_EMAIL);
    //*********************** Print Console Logs ******************************************
    static readonly GLOBAL_DISABLE_PRINT_LOGS: boolean = (_.isUndefined(process.env.PWG_PRINT_TO_STDIO_DISABLE) || _.isEmpty(process.env.PWG_PRINT_TO_STDIO_DISABLE))
        ? false : Utils.booleanfy(process.env.PWG_PRINT_TO_STDIO_DISABLE);

    /**
   * Return a project string based env var PWG_ENV_PROJECT throws an error if not set.
   * @returns Return a project string based env var PWG_ENV_PROJECT throws an error if not set.
   */
    static getGlobalProject() {
        if (_.isUndefined(process.env.PWG_ENV_PROJECT) || _.isNull(process.env.PWG_ENV_PROJECT)) {
            console.log('---', _.toString(process.env.PWG_ENV_PROJECT));
            return _.toString(process.env.PWG_ENV_PROJECT);
        } else {
            throw Error('PWG_ENV_PROJECT environment varibale not set.');
        }
    }

//     /**
//    * Parse the given env var PWG_ENV_RP_TAGS and return tags in the objet form.
//    * Format : tag1--val1@@tag2--val2@@tag3--val3
//    * example : k1--v1@@k2--v2
//    * @returns return tags in the objet form from the above format.
//    */
    static getRpTags() {
    // eslint-disable-next-line @typescript-eslint/ban-types
        const launchTags: { key: string; value?: string }[] = [];
        const launchTagEnvString: string = _.isUndefined(process.env.PWG_ENV_RP_TAGS) ? '' : _.toString(process.env.PWG_ENV_RP_TAGS);

        if (launchTagEnvString.indexOf(this.GLOBAL_SEPARATOR) > 0) {
            const tmpTagCollections = launchTagEnvString.split(this.GLOBAL_SEPARATOR);
            for (let index = 0; index < tmpTagCollections.length; index++) {
                const tmpTags = tmpTagCollections[index].split('--');
                let tmpTag: { key: string; value?: string };
                if (tmpTags.length === 2) {
                    tmpTag = { 'key': tmpTags[0], 'value': tmpTags[1] };
                } else {
                    tmpTag = { 'key': tmpTags[0] };
                }
                launchTags.push(tmpTag);
            }
        } else {
            let rpTagsJsonText = launchTagEnvString.trim();
            rpTagsJsonText = rpTagsJsonText.replace(/['\n']/g, '');
            const rpTagsJson = JSON.parse(rpTagsJsonText);
            Object.entries(rpTagsJson).forEach((entry) => {
                const [key, value] = entry as [string,string|undefined];
                launchTags.push({ 'key': key, 'value': value });
            });
            //framework details
            if (process.env.BUILD_TAG !== undefined && os.hostname() !== 'os-worker-windo') {
                launchTags.push({ 'key': 'UserName', 'value': 'Default' }, { 'key': 'System', 'value': os.hostname() }, { 'key': 'Framework', 'value': 'Playwright' }, { 'key': 'Build_Tag', 'value': process.env.BUILD_TAG }, { 'key': 'Jenkins_Url', 'value': process.env.JENKINS_URL });
            }
            else if (os.hostname() === 'os-worker-windo') {
                launchTags.push({ 'key': 'UserName', 'value': process.env.USERNAME }, { 'key': 'System', 'value': os.hostname() }, { 'key': 'Framework', 'value': 'Playwright' }, { 'key': 'Build_Tag', 'value': process.env.BUILD_TAG }, { 'key': 'Jenkins_Url', 'value': process.env.JENKINS_URL });
            }
            else {
                launchTags.push({ 'key': 'UserName', 'value': process.env.USERNAME }, { 'key': 'System', 'value': os.hostname() }, { 'key': 'Framework', 'value': 'Playwright' });
            }
        }
        return launchTags;
    }

//     /**
//    * Get the cureent local date and time stamp in the form mmddyyyyhhmmss
//    * @returns current date time string with format mmddyyyyhhmmss
//    */
    static getCurrentSuiteTimeStamp(): string {
        const date = new Date();
        const mm = ('0' + date.getMonth() + 1).slice(-2);
        const dd = ('0' + date.getDate()).slice(-2);
        const yyyy = date.getFullYear();
        const hh = ('0' + date.getHours()).slice(-2);
        const mins = ('0' + date.getMinutes()).slice(-2);
        const ss = ('0' + date.getSeconds()).slice(-2);
        const suiteDateTimeStamp = this.GLOBAL_PROJECT + this.GLOBAL_SUITE_NAME + mm + dd + yyyy + hh + mins + ss;
        return suiteDateTimeStamp;
    }

        /**
     * Format date and time
     */
        static formatDateTime(date: Date): string {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    
        /**
         * Format duration
         */
        static formatDuration(duration: number): string {
            const hours = Math.floor(duration / 3600000);
            const minutes = Math.floor((duration % 3600000) / 60000);
            const seconds = Math.floor((duration % 60000) / 1000);
            const milliseconds = duration % 1000;
            return `${hours}h ${minutes}m ${seconds}s + ${milliseconds}ms`;
        }
}
