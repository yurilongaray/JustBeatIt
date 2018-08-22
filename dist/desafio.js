"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Todos os arquivos:
// const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
var archive = new archive_1.default('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
if (archive.prices && archive.spents && archive.supplies) {
    var prices_1 = archive.prices; //array com as datas de alteração do preço do combustível.
    var spents = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    var supplies = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
    console.log('Existem dados');
    var suppliesDates = supplies.map(function (supplyDate) {
        return supplyDate.date;
    });
    var pricesDates = supplies.map(function (priceDate) {
        return priceDate.date;
    });
    /* Average Liter Price per Day */
    var totalDayPrice_1 = 0;
    var countX_1 = 0;
    var X = prices_1.map(function (price) {
        return totalDayPrice_1 += price.value;
    });
    var Y = prices_1.map(function (price) {
        return countX_1++;
    });
    //Average Result:
    var averageGas = totalDayPrice_1 / countX_1;
    console.log('Average per Day: ' + averageGas);
    /* Liters Suplied per Day */
    var litersSupplied_1 = [];
    /* One Way X */
    supplies.forEach(function (supply) {
        prices_1.forEach(function (price) {
            if (price.date === supply.date) {
                var liters = (supply.value / price.value);
                var dateSuplied = supply.date;
                // console.log(liters + ' x ' + dateSuplied);
                return litersSupplied_1.push({ date: dateSuplied, value: liters });
            }
            // else {
            //     let liters = (supplie.value / averagePricePerDay);
            //     let dateSuplied = supplie.date;
            //     // console.log(litersRounded + ' x ' + dateSuplied);
            //     litersSupplied.push({date: dateSuplied, value: liters});
            // }
        });
    });
    // console.log(litersSupplied)
    /* One Way X */
    // prices.map((price) => {
    //     return supplies.filter((supply) => {
    //         if(supply.date.indexOf(price.date) != -1) {
    //             let liters = (supply.value / price.value);
    //             let dateSuplied = supply.date;
    //             // console.log(liters + ' x ' + dateSuplied);
    //             console.log(' já existe na coleção');
    //             litersSupplied.push({date: dateSuplied, value: liters});
    //         } else if(supply.date.indexOf(price.date) == -1) {
    //             console.log(' NAO');
    //             let liters = (supply.value / averagePricePerDay);
    //             let dateSuplied = supply.date;
    //             // console.log(liters + ' x ' + dateSuplied);
    //             litersSupplied.push({date: dateSuplied, value: liters});
    //         }
    //     });
    // })
    // console.log(suppliesDates)
    // litersSupplied is an array of Object that contains Liters paid per Day
    // litersSupplied.map((value) => {
    //     console.log(value);
    // });
    // secondlitersSupplied.map((values) => {
    //     console.log(values);
    // })
    var litersWasted_1 = [];
    spents.forEach(function (spent) {
        litersSupplied_1.forEach(function (literSuplied) {
            if (spent.date === literSuplied.date) {
                // let litersRounded = Math.round(liters * 100) / 100;
                var dateDrove = spent.date;
                var gasWasted = Math.round((spent.value / literSuplied.value) * 100 / 100);
                litersWasted_1.push({
                    date: dateDrove,
                    value: gasWasted
                });
            }
        });
    });
    console.log(litersWasted_1);
}
