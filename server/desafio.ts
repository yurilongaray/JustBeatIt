import Archive from "./archive";

//Leitura dos arquivos (Home, Work):
const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');

let prices = archive.prices; //alteração do preço do combustível.
let spents = archive.spents; //uso do veículo em quilômetros (quilometragem percorrida no dia).
let supplies = archive.supplies; //bastecimentos do veículo em reais (não em litros).
let xobj = [] //Objeto centralizador de informações
let yobj = [] //Objeto a ser enviado pelo POST
let countPos = 0;
let countNeg = 0;
let count = 0;

if(prices && spents && supplies) {

    /* Average Liter Price per Day */
    let averageGasPrice = archive.getAverage(prices);
    
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

    /* xobj / Price = ( price and average per day) */
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

    /* xobj / supplies = gas, money supplied and the total km to road */
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

    /* xobj litersLeft */
    xobj.map((li) => {
        let total;
        if(li.litersSupplied > li.litersSpent) {
            li.litersLeft = (li.litersSupplied - li.litersSpent)
            countPos += li.litersLeft;
            total = li.litersSupplied + countPos;
        }
        else if(li.litersSupplied < li.litersSpent) {
            li.litersMissed = (li.litersSpent - li.litersSupplied)
            countNeg += li.litersMissed
        }
    })

    /* Count session */
    xobj.map((value) => {

        let total;
        // countLiters = values.litersSupplied - values.litersSpent;
        if(value.litersLeft > 0 || value.litersMissed > 0) {

            if(value.litersLeft > value.litersMissed) {
                count += (value.litersLeft - value.litersMissed) 
                total = value.litersSpent + count;
            }
            else if(value.litersLeft < value.litersMissed) {
                count += (value.litersMissed - value.litersLeft)
                total = value.litersSpent + count;
            }

            console.log(count)
        // } else if(value.litersLeft === 0 && value.litersMissed > 0) {
            
        // } else if (value.litersLeft === 0 && value.litersMissed === 0) {

        }
        // console.log(countLiters)

        // values.totalGasDay 
        // total = countLiters + values.LitersSupplied
        // if(values.litersSupplied > 0 && values.litersSpent > 0) {
        //     total = 
        // }
        // values.totalGasDay
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
    xobj.map((value) => {
        console.log(value);
        console.log('');
    })
    console.log('AverageGasPrice: ' + averageGasPrice);
    // console.log(countNeg + ' ' + countPos)

    /* Create json.file */
    archive.createJson(xobj);

    /* Send POST do destiny */
    // archive.sendPost(yobj);

}//End If