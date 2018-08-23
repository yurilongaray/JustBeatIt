import Archive from "./archive";

//Leitura dos arquivos (Home, Work):
const archive: any = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');

let prices: any   = archive.prices; //alteração do preço do combustível.
let spents: any   = archive.spents; //uso do veículo em quilômetros (quilometragem percorrida no dia).
let supplies: any = archive.supplies; //bastecimentos do veículo em reais (não em litros).
let xobj: any     = [] //Objeto centralizador de informações
let yobj: any     = [] //Objeto a ser enviado pelo POST

if(prices && spents && supplies) {

    let startDate = new Date("2017-01-22"); //21-01-2017 
    let endDate   = new Date("2018-07-28"); //26-07-2018
    let dates     = archive.getDateArray(startDate, endDate);

    /* Adding all the dates */
    dates.map((value) => {

        xobj.push({
            date: value.date,
            suppliedLiters: 0,
            spentLiters: 0,
            priceGas: 0,
            presentGas: 0
        })
    })

    /* Adding spentLiters */
    xobj.forEach(obj => {
        
        spents.forEach(spent => {
            
            if(obj.date === spent.date) {

                obj.spentLiters = (spent.value / 12);
            }
        });
    });

    /* Adding prices for Gas */
    xobj.forEach(obj => {
        
        prices.forEach(price => {
            
            if(obj.date === price.date) {

                obj.priceGas = price.value;
            }
        });
    });

    /* Getting priceGas validity */
    for(let i = 0; i < xobj.length; i++) {

        if(xobj[i-1] !== undefined) {

            if(xobj[i].priceGas === 0) {

                xobj[i].priceGas = xobj[i-1].priceGas;
            }
        }
    }

    /* Adding suppliedLiters */
    xobj.forEach(obj => {
        
        supplies.forEach(supply => {
            
            if(obj.date === supply.date) {

                obj.suppliedLiters = (supply.value / obj.priceGas);
            }
        });
    });

    /* Total */
    for(let i = 0; i < xobj.length; i++) {
        
        if(xobj[i-1] !== undefined) {

            xobj[i].presentGas = (xobj[i].suppliedLiters - xobj[i].spentLiters) + (xobj[i-1].presentGas);
        }
    }

    /* Debugger */
    xobj.map((value) => {

        // let teste = archive.formatNumber(value.presentGas, 2)
        console.log(value.presentGas)
    })

    /* Creating the object destiny to POST */
    xobj.map((value) => {

        let result: number = parseFloat(value.presentGas.toFixed(2));

        yobj.push({
            date: value.date,
            value: result
        })
    })

    /* Create json.file */
    archive.createJson(xobj);

    /* Send POST do destiny */
    // archive.sendPost(yobj);

}