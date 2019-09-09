import fetch from 'node-fetch';
import * as fs from 'fs';

class Archive {

    public prices: any;
    public spents: any;
    public supplies: any;
    
    constructor(dirPrices: string, dirSpents: string, dirSupplies: string) {

        this.prices   = JSON.parse(fs.readFileSync(dirPrices, 'utf8'));
        this.spents   = JSON.parse(fs.readFileSync(dirSpents, 'utf8'));
        this.supplies = JSON.parse(fs.readFileSync(dirSupplies, 'utf8'));
    }

    public createJson(obj: Object) {
        
        const json = JSON.stringify(obj);

        fs.writeFile("./server/desafio.json", json, 'utf8', function (err) {
            if (err) {
                throw err;
            }
            
            console.log('Json file Created');
        });
    }

    public sendPost(obj: Object) {

        const url = 'https://challenge-for-adventurers.herokuapp.com';
        const id  = '5d764cb56c3b3200148469e7';

        // 5b7c0c20cf8c8200147dcdc5 e 5d764cb56c3b3200148469e7
        
        console.log(`Iniciando POST para: ${url}/check?${id}`)

        fetch(`${url}/check?id=${id}`, 
            { 
                method: 'POST', 
                body: JSON.stringify(obj),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(json => console.log(json));
    }

    public getDateArray(start: any, end: any) {

        let arr: any = new Array();
        let dt: any  = new Date(start);

        while (dt <= end) { 

            arr.push({
                date: this.formatDate(dt)
            });
            dt.setDate(dt.getDate() + 1);
        }

        return arr;
    }

    public formatDate(date: any) {

        let dt = new Date(date);
        let mes = '' + (dt.getMonth() + 1);
        let dia = '' + dt.getDate();
        let ano = dt.getFullYear();


        if (mes.length < 2) mes = '0' + mes;
        if (dia.length < 2) dia = '0' + dia;

        return [dia, mes, ano].join('/');
    }
}

export default Archive;