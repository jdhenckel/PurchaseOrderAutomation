import axios from 'axios';
import { Utils } from './utils';

// The window.app is a global pointer to the singleton of this class.
// This app main job is to be the container for all the child view/controllers.
// Also this class manages switching context from one view to another.

export class MainApp {

    constructor(public utils: Utils)
    {
        console.log('construct MainApp');
    }

}

//==================================
// Create main app, and install it in a global variable

let app = new MainApp(new Utils(document));

// expose the app globally, so we can use it in the index.html
(<any>window || global || {}).app = app;
