

const {auth} = require('google-auth-library');

const keys = {
  type: "service_account",
  project_id: "evident-catcher-530",
  private_key_id: "a219b04e1e9d615d9947e2509bc21703e5626d5e",
  private_key: "see file download",      // TODO <== ********************************
  client_email: "166175218903@developer.gserviceaccount.com",
  client_id: "166175218903.apps.googleusercontent.com",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/166175218903%40developer.gserviceaccount.com"
};

exports.handler = function(event, context, callback) {

    const client = auth.fromJSON(keys);
    client.scopes = ['https://www.googleapis.com/auth/spreadsheets'];
    let url = 'https://sheets.googleapis.com/v4/spreadsheets/1_owEhU0Ewa6Lc20jhhb5uB4uG1CW9ZEkId5nYOzxdts/values/Sheet1';

// This can read the sheet without any key!
// ?key=AIzaSyDUlgg4ejZjOnSRjjA5QDCqU8YrL7QQU3E

    // Parameters to 'request': url, method, body, headers, timeout

    client.request({url}).then(res => {
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(res.data)
        })}, err => callback(err));
}
