/* eslint-disable @typescript-eslint/no-unused-vars */
import { FullConfig, Reporter, Suite, TestCase, FullResult, TestResult } from '@playwright/test/reporter';
import { sendEmailWithReport } from './email-util';
import { Constants } from './constants';
import path from 'path';
let startTime: string;
let endTime: string;
let passedCount = 0;
let failedCount = 0;
let skippedCount = 0;
let myMap = new Map<string, number>();
const testSet = new Set();



export class CustomReporter implements Reporter {
    startDateTime: Date;
    endDateTime: Date;
    formattedDuration: string;

    constructor() {
        this.startDateTime = null;
        this.endDateTime = null;
    }
    onBegin(config: FullConfig, suite: Suite) {
        for (let i = 0; i < config.projects.length; i++) {
            myMap.set(config.projects[i].name, config.projects[i].retries);
        }
        passedCount = 0; // Reset the counters for each test run
        failedCount = 0;
        skippedCount = 0;
        testSet.clear();
        this.startDateTime = new Date();
        startTime = Constants.formatDateTime(this.startDateTime);
    }

    onTestBegin(test: TestCase) {
        testSet.add(test);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tc: any = test;
        this.endDateTime = new Date();
        endTime = Constants.formatDateTime(this.endDateTime);
        const duration = this.endDateTime.getTime() - this.startDateTime.getTime();
        this.formattedDuration = Constants.formatDuration(duration);
        const totalRertyCount = myMap.get(tc._projectId);

        if (result.status === 'passed') {
            passedCount++;
        }

        else if ((result.status === 'failed' || result.status === 'timedOut' || result.status === 'interrupted') && result.retry === totalRertyCount) {
            failedCount++;
        }
        else if (result.status === 'skipped') {
            skippedCount++;
        }

    }

    async onEnd(result: FullResult) {
        const totalTestCount = testSet.size;
        const passRate = (passedCount / totalTestCount) * 100;
        const roundedPassRate = parseFloat(passRate.toFixed(2));
        const passRateWithPercentage = roundedPassRate.toString() + '%';
        if (Constants.GLOBAL_SEND_EMAIL) {
            console.log('Total tests executed:', totalTestCount);
            console.log('Passed tests:', passedCount);
            console.log('Failed tests:', failedCount);
            console.log('Skipped tests:', skippedCount);

            let reportFolder;
            if (!process.env.PLAYWRIGHT_HTML_REPORT) {
                reportFolder = 'playwright-report';
            }
            else {
                reportFolder = process.env.PLAYWRIGHT_HTML_REPORT;
            }
            const reportPath = path.join(process.cwd(), reportFolder, 'index.html');
            // Send the email with the report
            await sendEmailWithReport(reportPath, startTime, endTime, this.formattedDuration, totalTestCount, passedCount, failedCount, skippedCount, passRateWithPercentage);
        }
    }
    //Print logs in the console
    printsToStdio(): boolean {
        if (Constants.GLOBAL_DISABLE_PRINT_LOGS) {
            return true;
        }
        else {
            return false;
        }
    }
    //get passcount
    getPassCount() {
        return passedCount;
    }
}
exports.default = CustomReporter;
