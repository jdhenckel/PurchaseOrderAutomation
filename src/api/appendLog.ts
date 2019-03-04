import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { Helper } from './common/helper';

/*
The google sheet for the log
*/
const logSheetId = '1pawVLkEO6Mx7AKJuIeBwnw3azUgkkBZC1MOkRB9Mcyg/values/log';

/*
This append rows to the LOG google sheet.
*/
export function handler(event: APIGatewayEvent, context: Context, callback: Callback) {

    let helper = new Helper();
//    let body = JSON.parse(event.body);

    // requestId	dateCreated	schoolName	isOfficial	rawData
    let rowList = [
        ['aa','bb','cc','dd','ee']
    ];

    helper.appendSheet(logSheetId, rowList).then(
        data => callback(null,helper.ok(data)),
        err => callback(err));
}
