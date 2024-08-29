
export class Utils {

    /**
     * This method handles undefined string input and assigns an empty value for it.
     * @param value The imput string value, ex : process.env.PWG_ENV_PROJECT
     * @returns given string value if not undefined string input and returns '' for undefined string input.
     */
    static handleUndefinedString(value: string | undefined): string {
        if (typeof value !== 'undefined' && value) {
            return value;
        } else {
            return '';
        }
    }

    static getEnv(name: any) {
        const val = process.env[name];
        if ((val === undefined) || (val === null)) {
            throw ('missing env var for ' + name);
        }
        return val;
    }

    static booleanfy(value: any): boolean {
        const truthy: string[] = ['true', 'True', 'TRUE', '1', 'yes', 'Yes', 'YES', 'Y', 'y'];
        let check = false;
        check = truthy.includes(value);
        return check;
    }

}
