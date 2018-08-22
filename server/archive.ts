import fetch from 'node-fetch';
import * as fs from 'fs';

class Archive {

    public prices: any;
    public spents: any;
    public supplies: any;
    
    constructor(dirPrices: string, dirSpents: string, dirSupplies: string) {

        this.prices = JSON.parse(fs.readFileSync(dirPrices, 'utf8'));
        this.spents = JSON.parse(fs.readFileSync(dirSpents, 'utf8'));
        this.supplies = JSON.parse(fs.readFileSync(dirSupplies, 'utf8'));
    }

    createJson(obj: Object) {
        
        const json = JSON.stringify(obj);

        fs.writeFile("./server/desafio.json", json, 'utf8', function (err) {
            if (err) throw err;
            console.log('Json file Created');
            }
        );
    }

    sendPost(obj: Object) {

        const url = 'https://challenge-for-adventurers.herokuapp.com';
        const id = '5b7c0c20cf8c8200147dcdc5';
        
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
}

export default Archive;