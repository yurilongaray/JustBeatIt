"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Todos os arquivos:
var archive = new archive_1.default('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
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
    ///////////////////////////////////
    /* Average Liter Price per Day */
    var totalDayPrice_1 = 0;
    var countX_1 = 0;
    prices_1.map(function (price) {
        return totalDayPrice_1 += price.value;
    });
    prices_1.map(function (price) {
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
                el.value = element.value * 12;
            }
        });
    });
    supplies.map(function (supply) {
        test_1.map(function (ts) {
            if (ts.value === -1 && ts.date === supply.date) {
                var liters = (supply.value / averageGas_1) * 12;
                // console.log(liters + ' x ' + dateSuplied);
                ts.value = liters;
            }
        });
    });
    /* Resultado 1 */
    test_1.map(function (values) {
        console.log(values);
    });
    // ///////////////////////////////////
    /* Average Km that can be road */
    var totalDay_1 = 0;
    var countY_1 = 0;
    test_1.map(function (liter) {
        return totalDay_1 += liter.value;
    });
    test_1.map(function (test) {
        return countY_1++;
    });
    var averageKm_1 = totalDay_1 / countY_1;
    // ///////////////////////////////////
    //teste contem quantos km é possível que o veiculo ande de acordo com os litros comprados por dia
    var kmDay_1 = [];
    var etcx = [];
    spents.forEach(function (element) {
        kmDay_1.push({
            date: element.date,
            value: -1
        });
    });
    kmDay_1.forEach(function (km) {
        test_1.forEach(function (ts) {
            if (km.date === ts.date) {
                km.value = ts.value;
            }
            else if (km.date !== ts.date && km.value === -1) {
                km.value = averageKm_1;
            }
        });
    });
    kmDay_1.map(function (value) {
        console.log(value);
    });
    // OK ^
    // let litersWasted = [];
    // let etc = []
    // spents.map((value) => {
    //     etc.push({
    //         date: value.date,
    //         value: -1
    //     })
    // })
    // spents.forEach(spent => {
    //     test.forEach(ts => {
    //         if(ts.date === spent.date) {
    //             let liters = (spent.value / ts.value);
    //             litersWasted.push({
    //                 date: ts.date,
    //                 value: liters
    //             })
    //         }
    //     })
    // });
    // etc.forEach(etc => { 
    //     litersWasted.forEach(lt => {
    //         if(etc.date === lt.date) {
    //             etc.value = parseFloat(lt.value.toFixed(2));
    //         }
    //     })
    // })
    // etc.map((etc) => {
    //     spents.map((spent) => {
    //         if(etc.value === -1 && etc.date === spent.date) {
    //             let liters = (spent.value / averageKm);
    //             // console.log(liters + ' x ' + dateSuplied);
    //             etc.value = parseFloat(liters.toFixed(2));
    //         }
    //     })
    // })
    // /* Resultado final */
    // // etc.map((value) => {
    // //     console.log(value)
    // // })
    console.log('Average Gas Per Day: ' + averageGas_1);
    console.log('Average Km per Day: ' + averageKm_1);
    // archive.createJson(etc);
    /* Post /check?id=SEU-ID */
    // const url = 'https://challenge-for-adventurers.herokuapp.com';
    // const id = '5b7c0c20cf8c8200147dcdc5';
    // console.log(`Iniciando POST para: ${url}/check?${id}`)
    // fetch(`${url}/check?id=${id}`, 
    //     { 
    //         method: 'POST', 
    //         body: JSON.stringify(etc),
    //         headers: { 'Content-Type': 'application/json' },
    //     })
    // .then(res => res.json())
    // .then(json => console.log(json));
}
