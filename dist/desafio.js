"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Todos os arquivos:
// const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
var archive = new archive_1.default('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
if (archive.prices && archive.spents && archive.supplies) {
    var prices = archive.prices; //array com as datas de alteração do preço do combustível.
    var spents = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    var supplies = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
    console.log('Existem dados');
    /* Average Liter Price per Day */
    var totalDayPrice_1 = 0;
    var countX_1 = 0;
    var X = prices.map(function (price) {
        return totalDayPrice_1 += price.value;
    });
    var Y = prices.map(function (price) {
        return countX_1++;
    });
    //Average Result:
    var averagePricePerDay = totalDayPrice_1 / countX_1;
    console.log(totalDayPrice_1 + ' - ' + countX_1 + ', Average per Day: ' + averagePricePerDay);
    /* Liters Suplied per Day */
    var litersSupplied_1 = [];
    /* One Way X */
    // prices.forEach(price => {
    // supplies.forEach(supplie => {
    //     if(price.date === supplie.date) {
    //         let liters = (supplie.value / price.value);
    //         let dateSuplied = supplie.date;
    //         // console.log(liters + ' x ' + dateSuplied);
    //         litersSupplied.push({date: dateSuplied, value: liters});
    //     } 
    // else {
    //     let liters = (supplie.value / averagePricePerDay);
    //     let dateSuplied = supplie.date;
    //     // console.log(litersRounded + ' x ' + dateSuplied);
    //     litersSupplied.push({date: dateSuplied, value: liters});
    // }
    //     });
    // });
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
    var suppliesDates_1 = supplies.map(function (supply) {
        return supply.date;
    });
    // console.log(suppliesDates)
    prices.filter(function (price) {
        if (price.date.indexOf(suppliesDates_1) != -1) {
            console.log('S');
        }
        else {
            console.log('N');
        }
    });
    //litersSupplied is an array of Object that contains Liters paid per Day
    // litersSupplied.map(function(values) {
    //     return console.log(values);
    // });
    spents.forEach(function (spent) {
        litersSupplied_1.forEach(function (literSuplied) {
            if (spent.date === literSuplied.date) {
                // let litersRounded = Math.round(liters * 100) / 100;
                var dateDrove = spent.date;
            }
        });
    });
}
