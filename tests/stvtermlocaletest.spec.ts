// import * as dotenv from 'dotenv';
import {expect} from '@playwright/test';
import { test } from './../src/test-base';
// import {Localization} from '../src/localization'
import moment from 'moment';
import { trim } from 'lodash';
import { GlobalUtil } from '../src/global-util';



test('API - json path example', async ({ page, global }) => {
    console.log(process.env.OUTLOOK_USER);
    
    const expectRes={
        'store' : {
            'book': [
                {
                    'category': 'reference',
                    'author': 'Nigel Rees',
                    'title': 'Sayings of the Century',
                    'price': 8.95
                }, {
                    'category': 'fiction',
                    'author': 'Evelyn Waugh',
                    'title': 'Sword of Honour',
                    'price': 12.99
                }, {
                    'category': 'fiction',
                    'author': 'Herman Melville',
                    'title': 'Moby Dick',
                    'isbn': '0-553-21311-3',
                    'price': 8.99
                }, {
                    'category': 'fiction',
                    'author': 'J. R. R. Tolkien',
                    'title': 'The Lord of the Rings',
                    'isbn': '0-395-19395-8',
                    'price': 22.99
                }
            ],
            'bicycle': {
                'color': 'red',
                'price': 19.95
            }
        }
    };

    let _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.author');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.author');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.author');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, 'store.*');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, 'store..price');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[2]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[(@.length-1)]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[-1:]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[0,1]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[:2]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[?(@.isbn)]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[?(@.price<10)]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[?(@.price==8.95)]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.book[?(@.price<30 && @.category=="fiction")]');
    console.log(_jsonResVelue);

    _jsonResVelue= await global.apiUtil.getStringValueFromResponseUsingJsonPath(expectRes, '.*');
    console.log(_jsonResVelue);



});





