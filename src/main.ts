import './common.scss';
import { Utils } from './utils';

class Grade {
    id: string;
    active: boolean;
    name: string;
    answers: any;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.answers = {};
    }
}

export class MainApp {

    page: number;
    grades: Grade[];

    constructor(public utils: Utils)
    {
        console.log('construct MainApp');
        this.page = 0;
        this.showPage();
        this.grades = [
            new Grade('grk', 'kindergarten'),
            new Grade('gr1', '1<sup>st</sup> grade'),
            new Grade('gr2', '2<sup>nd</sup> grade'),
            new Grade('gr3', '3<sup>rd</sup> grade'),
            new Grade('gr4', '4<sup>th</sup> grade'),
            new Grade('gr5', '5<sup>th</sup> grade'),
            new Grade('gr6', '6<sup>th</sup> grade and above'),
        ];
    }


    onNext() {
        if (this.page == 0) {
            this.parseGrades();
        }
        ++this.page;
    }

    onPrev() {
        if (this.page > 0) --this.page;
    }

    parseGrades() {
        for (let g of this.grades) {
            let e = <HTMLInputElement> document.getElementById(g.id);
            g.active = e && e.checked;
        }
    }

    showPage() {

    }
}

//==================================
// Create main app, and install it in a global variable

let app = new MainApp(new Utils(document));

(<any>window || global || {}).app = app;
