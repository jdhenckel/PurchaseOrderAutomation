import './common.scss';
import { Utils } from './utils';

export class MainApp {

    constructor(public utils: Utils)
    {
        console.log('construct MainApp');
    }

}

//==================================
// Create main app, and install it in a global variable

let app = new MainApp(new Utils(document));

(<any>window || global || {}).app = app;
