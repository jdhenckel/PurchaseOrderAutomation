import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

export interface FunctionResponse {
    statusCode: number;
    body: string;
}

export interface GoogleSheet {
    range: string;
    majorDimension: string;
    values: string[][];
}

export class Helper {
    public sheetsConfig: AxiosRequestConfig;

    constructor() {
        this.sheetsConfig = {
            baseURL: 'https://sheets.googleapis.com/v4/spreadsheets/',
            timeout: 20000,     // Note AWS Lambda are limited to 10 seconds
            responseType: 'json',
            params: { key: 'AIzaSyDUlgg4ejZjOnSRjjA5QDCqU8YrL7QQU3E' }
        };
    }

    readSheet(sheetId:string):Promise<GoogleSheet> {

        console.log('ATTEMPT ', this.sheetsConfig.baseURL + sheetId);

        return axios.get(sheetId, this.sheetsConfig).then(response => {
            console.log('SUCCESS',response.path,response.data);
            return response.data;
        }, err => {
            console.log('FAILED',err.response.data);
            return err.response.data || err.response;
        });
    }

    appendSheet(sheetId:string,rowList:string[][]):Promise<GoogleSheet> {

        let postData = {
            range: sheetId.slice(sheetId.lastIndexOf('/') + 1),
            majorDimension: 'ROWS',
            values: rowList
        };
        console.log('ATTEMPT APPEND ', this.sheetsConfig.baseURL + sheetId, postData);

        return axios.post(sheetId + ':append?valueInputOption=USER_ENTERED', postData, this.sheetsConfig).then(response => {
            console.log('SUCCESS',response.path,response.data);
            return response.data;
        }, err => {
            console.log('FAILED',err.response.data);
            return err.response.data || err.response;
        });
    }

    ok(body:any):FunctionResponse {
        return {
            statusCode: 200,
            body: JSON.stringify(body)
        };
    }

    // Parse the values of a google sheet into an array of objects,
    // NOTE the first (non empty) row of the values MUST contain the column headings
    convertSheetToObjects(sheet:GoogleSheet):any[] {
        let head:string[] = null;
        let result:any[] = [];
        for (let row of sheet.values) {
            if (row.length ==  0) continue;
            if (head==null) head = row;
            else {
                let data:any = {};
                for (let i in head) if (head[i]) data[head[i]] = row[i];
                result.push(data);
            }
        }
        return result;
    }
}
