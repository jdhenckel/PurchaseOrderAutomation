import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Helper } from './common/helper';

/*
The tab value is the google sheet id appended with '/values/tab'
*/
let tablist = {
    questions: '1DSPatbzzjsQp3ZRGEKAGlTHmRmt6dQBv-jSa_fPQyTY/values/questions',
    productList: '1DSPatbzzjsQp3ZRGEKAGlTHmRmt6dQBv-jSa_fPQyTY/values/productList',
    recommendations: '1DSPatbzzjsQp3ZRGEKAGlTHmRmt6dQBv-jSa_fPQyTY/values/recommendations',
    log: '1pawVLkEO6Mx7AKJuIeBwnw3azUgkkBZC1MOkRB9Mcyg/values/log',
    test: '1_owEhU0Ewa6Lc20jhhb5uB4uG1CW9ZEkId5nYOzxdts/values/Sheet1'
}

/*
This reads data from google sheets.
*/
export function handler(event: APIGatewayEvent, context: Context, callback: Callback) {
    let helper = new Helper();
    let tab = event.queryStringParameters['tab'];
    if (tablist[tab]) {
        helper.readSheet(tablist[tab]).then(
            data => callback(null,helper.ok(helper.convertSheetToObjects(data))),
            err => { callback(err); Promise.resolve(); });
    }
    else {
        callback(new Error('The tab is not valid: ' + tab));
    }
}
