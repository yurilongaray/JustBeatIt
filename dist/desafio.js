"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Todos os arquivos:
var archive = new archive_1.default('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
if (archive.prices && archive.spents && archive.supplies) {
    var prices_1 = archive.prices; //array com as datas de alteração do preço do combustível.
    var spents_1 = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    var supplies = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
    console.log('Existem dados');
    var suppliesDates = supplies.map(function (supplyDate) {
        return supplyDate.date;
    });
    var pricesDates = supplies.map(function (priceDate) {
        return priceDate.date;
    });
    ///////////////////////////////////
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
    var averageGas_1 = totalDayPrice_1 / countX_1;
    // console.log('Average per Day: ' + averageGas);
    /* Liters Suplied per Day */
    var litersSupplied_1 = [];
    ////////////////////////////
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
            //     const liters = (supplie.value / averagePricePerDay);
            //     const dateSuplied = supplie.date;
            //     // console.log(litersRounded + ' x ' + dateSuplied);
            //     litersSupplied.push({date: dateSuplied, value: liters});
            // }
        });
    });
    var test_1 = [];
    supplies.map(function (value) {
        return test_1.push({
            date: value.date,
            value: -1
        });
    });
    litersSupplied_1.forEach(function (element) {
        test_1.forEach(function (el) {
            if (element.date === el.date) {
                el.value = element.value;
            }
        });
    });
    supplies.map(function (supply) {
        test_1.map(function (ts) {
            if (ts.value === -1 && ts.date === supply.date) {
                var liters = (supply.value / averageGas_1);
                // console.log(liters + ' x ' + dateSuplied);
                ts.value = liters;
            }
        });
    });
    /* Resultado 1 */
    // test.map((values) => {
    //     console.log(values)
    // })
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
    var etc_1 = [];
    spents_1.map(function (value) {
        etc_1.push({
            date: value.date,
            value: -1
        });
    });
    spents_1.forEach(function (spent) {
        test_1.forEach(function (ts) {
            if (ts.date === spent.date) {
                var liters = (spent.value / ts.value);
                litersWasted_1.push({
                    date: ts.date,
                    value: liters
                });
            }
        });
    });
    etc_1.forEach(function (etc) {
        litersWasted_1.forEach(function (lt) {
            if (etc.date === lt.date) {
                etc.value = parseFloat(lt.value.toFixed(2));
            }
        });
    });
    ///////////////////////////////////
    var totalDay_1 = 0;
    var countY_1 = 0;
    var Z = test_1.map(function (spent) {
        return totalDay_1 += spent.value;
    });
    var V = spents_1.map(function (spent) {
        return countY_1++;
    });
    var averageKm_1 = totalDay_1 / countY_1;
    ///////////////////////////////////
    etc_1.map(function (etc) {
        spents_1.map(function (spent) {
            if (etc.value === -1 && etc.date === spent.date) {
                var liters = (spent.value / averageKm_1);
                // console.log(liters + ' x ' + dateSuplied);
                etc.value = parseFloat(liters.toFixed(2));
            }
        });
    });
    /* Resultado final */
    etc_1.map(function (value) {
        console.log(value);
    });
    console.log('Average Gas Per Day: ' + averageGas_1);
    console.log('Average Km per Day: ' + averageKm_1);
    // litersWasted.forEach(waste => {
    //     test.forEach(ts => {
    //         if(waste.date === ts.date) {
    //             let liters = 
    //         }
    //     });
    // });
    // spents.forEach(spent => {
    //     litersSupplied.forEach(literSuplied => {
    //         if(spent.date === literSuplied.date) {
    //             // let litersRounded = Math.round(liters * 100) / 100;
    //             let dateDrove = spent.date;
    //             let gasWasted = Math.round( (spent.value / literSuplied.value) * 100 / 100);
    //             litersWasted.push({
    //                 date: dateDrove,
    //                 value: gasWasted
    //             })
    //         }
    //     })
    // });
    // console.log(litersWasted);
    /* Post /check?id=SEU-ID */
}
