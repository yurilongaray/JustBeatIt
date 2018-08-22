import Archive from "./archive";

//Leitura dos arquivos (Home, Work):
const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');

let prices = archive.prices; //alteração do preço do combustível.
let spents = archive.spents; //uso do veículo em quilômetros (quilometragem percorrida no dia).
let supplies = archive.supplies; //bastecimentos do veículo em reais (não em litros).
let xobj = []
let yobj = []

if(prices && spents && supplies) {

    /* Average Liter Price per Day */
    let totalDayPrice: number = 0;
    let countX: number = 0;
    
    prices.map(function(price) {
        return totalDayPrice += price.value;
    }); 

    prices.map(function(price) {
        return countX ++;
    }); 
    
    //Average Result:
    let averageGasPrice = (totalDayPrice / countX);

    /* /////////////////////////// */

    

    /*  
        Applying, into the objX, all the dates present on spents 
        Converting the km on liters by x/12
        Creating the other props 
    */
    spents.map((spent) => {
        let litersSpent = (spent.value / 12)
        xobj.push({
            date: spent.date,
            kmSpent: spent.value,
            litersSpent: litersSpent,
            gasPriceDay: 0,
            litersSupplied: 0,
            moneySpentOnGas: 0,
            kmToRoad: 0,
            litersLeft: 0,
            litersMissed: 0,
            totalGasDay: 0
        })
    })

    // xobj / Price = ( price and average per day)
    prices.forEach(price => {
        xobj.forEach(li => {
            if(price.date === li.date) {
                li.gasPriceDay = price.value
            } 
            else if(price.date !== li.date && li.gasPriceDay === 0 ) {
                li.gasPriceDay = averageGasPrice;
            }
        });
    });

    // xobj / supplies = gas, money supplied and the total km to road
    supplies.forEach(supply => {
        xobj.forEach(li => {
            if(supply.date === li.date) {
                li.moneySpentOnGas = supply.value;
                li.litersSupplied = (supply.value / li.gasPriceDay);
                li.kmToRoad = (li.litersSupplied * 12);
            } 
            else if( (supply.date !== li.date) && (li.gasSupplied === 0) ) {
                li.litersSupplied = 'x';
                li.gasPriceDay = 'x';
                li.kmToRoad = 'x';
            }
        });
    });

    //xobj litersLeft
    xobj.map((li) => {
        if(li.litersSupplied > li.litersSpent) {
            return li.litersLeft = (li.litersSupplied - li.litersSpent)
        }
        else if(li.litersSupplied < li.litersSpent) {
            return li.litersMissed = (li.litersSpent - li.litersSupplied)
        }
    })

    /* Passando para o Obj de destino */
    xobj.map((values) => {
        let result:number = parseFloat(((values.litersLeft !== 0) ? values.litersLeft : values.litersMissed).toFixed(2));
        yobj.push({
            date: values.date,
            value: result
        })
    })

    /* Debugger */
    yobj.map((value) => {
        console.log(value);
        console.log('');
    })
    console.log('AverageGasPrice: ' + averageGasPrice);

    /* Create json.file */
    archive.createJson(xobj);

    /* Send POST do destiny */
    archive.sendPost(yobj);

}//End If