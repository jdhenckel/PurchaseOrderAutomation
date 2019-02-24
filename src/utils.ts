import 'ts-polyfill';  // this is needed for Internet Explorer
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

export class Utils {
    public axiosConfig: AxiosRequestConfig;

    constructor() {
        this.axiosConfig = {
        //    baseURL: 'whatever',
            timeout: 600000,
            responseType: 'json'
            params: { key: 'AIzaSyDUlgg4ejZjOnSRjjA5QDCqU8YrL7QQU3E' }
        };
    }

    // get a button by id
    getButton(id:string):HTMLButtonElement {
        let e = document.getElementById(id);
        return e.tagName == 'BUTTON' ? <HTMLButtonElement> e : null;
    }

    // get an input element by id
    getInput(id:string):HTMLInputElement {
        let e = document.getElementById(id);
        return e.tagName == 'INPUT' ? <HTMLInputElement> e : null;
    }

    // find an element by id, and if found set its display property based on a boolean
    showDiv(id:string,isVisible:boolean,visibleStyle = 'block'):HTMLElement {
        let div = document.getElementById(id);
        if (div) div.style.display = isVisible ? visibleStyle : 'none';
        return div;
    }

    put<T>(url: string, data?: any): Promise<T> {
        return axios.put<T>(url, data, this.axiosConfig).then(response => response.data);
    }

    delete(url: string): Promise<any> {
        return axios.delete(url, this.axiosConfig);
    }

    post<T>(url: string, data?: any): Promise<T> {
        return axios.post<T>(url, data, this.axiosConfig).then(response => response.data);
    }

    get<T>(url: string): Promise<T> {
        return axios.get<T>(url, this.axiosConfig).then(response => response.data);
    }

    getSheet(): Promise<any> {
        return get<any>('https://sheets.googleapis.com/v4/spreadsheets/1_owEhU0Ewa6Lc20jhhb5uB4uG1CW9ZEkId5nYOzxdts/values/Sheet1!A1:D5');
    }

    sanitize(html: string): string {
        // removes all the bad things from html
        if (html == null) return html;
        let s = html.trim().replace(/</g, '&lt;');
        return s;
    }
}
