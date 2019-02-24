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

    // The page is the grade currently shown, else -1 is the checkboxes page.
    page: number;
    grades: Grade[];

    constructor(public utils: Utils)
    {
        console.log('construct MainApp');
        this.parseGradeLabels();
        this.page = -1;
        this.showPage();
        this.utils.showDiv('all-questions',true);
        this.loadSheet();
    }

    loadSheet() {
        utils.getSheet().then(data => {
            console.log('SHEET',data);
        }, err => {
            console.log('SHEET ERROR',err);
        });
    }

    // loop over the checkboxes to create parallel array of grades
    parseGradeLabels() {
        let labelList = document.getElementById('ask-grade').getElementsByTagName('LABEL');
        this.grades = [];
        for (let label of Array.from(labelList)) {
            this.grades.push(new Grade(label.getAttribute('for'), label.innerHTML));
        }
        console.log('parse grades',this.grades);
    }


    // increment to the next active page
    onNext() {
        if (this.page == -1) {
            this.setActiveGrades();
        }
        while (++this.page < this.grades.length && !this.grades[this.page].active) {}
        this.showPage();
    }

    // decrement to the previous active page
    onPrev() {
        while (--this.page >= 0 && !this.grades[this.page].active) {}
        this.showPage();
    }

    // loop over the checkboxes to set the active flag on each grade
    setActiveGrades() {
        for (let g of this.grades) {
            let e = <HTMLInputElement> document.getElementById(g.id);
            g.active = e && e.checked;
        }
    }

    // show to correct page, and activate the prev/next buttons appropriately
    showPage() {
        this.utils.showDiv('ask-grade',this.page == -1);
        let i = 0;
        let anyActive = false;
        for (let g of this.grades) {
            this.utils.showDiv(g.id + '-questions',this.page == i++);
            anyActive = anyActive || g.active;
        }
        this.utils.getButton('prev-button').disabled = this.page < 0;
        this.utils.getButton('next-button').disabled = !anyActive;
    }

    // when user changes the grades checkboxes
    onChangeGrades() {
        this.setActiveGrades();
        this.showPage();
    }
}

//==================================
// Create main app, and install it in a global variable

(<any>window).app = new MainApp(new Utils());
