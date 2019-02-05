import 'ts-polyfill';  // this is needed for Internet Explorer
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

export class Utils {
    public axiosConfig: AxiosRequestConfig;

    constructor(public doc: Document) {
        this.axiosConfig = {
            baseURL: 'whatever',
            timeout: 600000,
            responseType: 'json'
        };
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

    sanitize(html: string): string {
        // removes all the bad things from html
        if (html == null) return html;
        let s = html.trim().replace(/</g, '&lt;');
        return s;
    }
}
