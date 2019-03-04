let axios = require('axios');

exports.handler = function(event,context,callback) {
    getSheet().then(
        data => callback(null, { statusCode: 200, body: JSON.stringify(data) }),
        err => callback(err));
}

function getSheet() {
    let sheetId = '1_owEhU0Ewa6Lc20jhhb5uB4uG1CW9ZEkId5nYOzxdts';
    let config = {
        baseURL: 'https://sheets.googleapis.com',
        timeout: 20000,     // Note AWS Lambda are limited to 10 seconds
        responseType: 'json',
        params: { key: 'AIzaSyDUlgg4ejZjOnSRjjA5QDCqU8YrL7QQU3E' }
    };
    return axios.get('/v4/spreadsheets/'+sheetId+'/values/Sheet1!A1:D5', config)
        .then(response => {
            console.log('ok sheet', response.data);
            return response.data;
        }, err => console.log('bad sheet',err));
}
