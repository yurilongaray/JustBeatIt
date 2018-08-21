"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Todos os arquivos:
var archive = new archive_1.default('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
if (archive.prices && archive.spents && archive.supplies) {
    var prices = archive.prices; //array com as datas de alteração do preço do combustível.
    var spents = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    var supplies_1 = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
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
    var averagePricePerDay_1 = totalDayPrice_1 / countX_1;
    console.log(totalDayPrice_1 + ' - ' + countX_1 + ', Average per Day: ' + averagePricePerDay_1);
    /* Liters Suplied per Day */
    var litersSupplied_1 = [];
    prices.forEach(function (price) {
        supplies_1.forEach(function (supplie) {
            if (price.date === supplie.date) {
                var liters = (supplie.value / price.value);
                var dateSuplied = supplie.date;
                // console.log(litersRounded + ' x ' + dateSuplied);
                litersSupplied_1.push({ date: dateSuplied, value: liters });
            }
            else {
                var liters = (supplie.value / averagePricePerDay_1);
                var dateSuplied = supplie.date;
                // console.log(litersRounded + ' x ' + dateSuplied);
                litersSupplied_1.push({ date: dateSuplied, value: liters });
            }
        });
    });
    //litersSupplied is an array of Object that contains Liters paid per Day
    litersSupplied_1.map(function (values) {
        return console.log(values);
    });
    spents.forEach(function (spent) {
        litersSupplied_1.forEach(function (literSuplied) {
            if (spent.date === literSuplied.date) {
                // let litersRounded = Math.round(liters * 100) / 100;
                var dateDrove = spent.date;
            }
        });
    });
}
