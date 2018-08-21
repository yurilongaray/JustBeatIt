import * as fs from 'fs';
import { IInterface } from '../interface';
const json = JSON.parse(fs.readFileSync('./prices.json', 'utf8'));

class Prices implements IInterface{
    
    public date: any;

    constructor() {}

    getByDate(date: any) {
        
    }
    
    getByValue(value: number) {

    }

    apresenta() {
        console.log(json);
    }

}

export default new Prices();