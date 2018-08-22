"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Leitura dos arquivos (Home, Work):
var archive = new archive_1.default('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
var prices = archive.prices; //alteração do preço do combustível.
var spents = archive.spents; //uso do veículo em quilômetros (quilometragem percorrida no dia).
var supplies = archive.supplies; //bastecimentos do veículo em reais (não em litros).
var xobj = [];
var yobj = [];
if (prices && spents && supplies) {
    /* Average Liter Price per Day */
    var totalDayPrice_1 = 0;
    var countX_1 = 0;
    prices.map(function (price) {
        return totalDayPrice_1 += price.value;
    });
    prices.map(function (price) {
        return countX_1++;
    });
    //Average Result:
    var averageGasPrice_1 = (totalDayPrice_1 / countX_1);
    /* /////////////////////////// */
    /*
        Applying, into the objX, all the dates present on spents
        Converting the km on liters by x/12
        Creating the other props
    */
    spents.map(function (spent) {
        var litersSpent = (spent.value / 12);
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
        });
    });
    // xobj / Price = ( price and average per day)
    prices.forEach(function (price) {
        xobj.forEach(function (li) {
            if (price.date === li.date) {
                li.gasPriceDay = price.value;
            }
            else if (price.date !== li.date && li.gasPriceDay === 0) {
                li.gasPriceDay = averageGasPrice_1;
            }
        });
    });
    // xobj / supplies = gas, money supplied and the total km to road
    supplies.forEach(function (supply) {
        xobj.forEach(function (li) {
            if (supply.date === li.date) {
                li.moneySpentOnGas = supply.value;
                li.litersSupplied = (supply.value / li.gasPriceDay);
                li.kmToRoad = (li.litersSupplied * 12);
            }
            else if ((supply.date !== li.date) && (li.gasSupplied === 0)) {
                li.litersSupplied = 'x';
                li.gasPriceDay = 'x';
                li.kmToRoad = 'x';
            }
        });
    });
    //xobj litersLeft
    xobj.map(function (li) {
        if (li.litersSupplied > li.litersSpent) {
            return li.litersLeft = (li.litersSupplied - li.litersSpent);
        }
        else if (li.litersSupplied < li.litersSpent) {
            return li.litersMissed = (li.litersSpent - li.litersSupplied);
        }
    });
    /* Passando para o Obj de destino */
    xobj.map(function (values) {
        var result = parseFloat(((values.litersLeft !== 0) ? values.litersLeft : values.litersMissed).toFixed(2));
        yobj.push({
            date: values.date,
            value: result
        });
    });
    /* Debugger */
    yobj.map(function (value) {
        console.log(value);
        console.log('');
    });
    console.log('AverageGasPrice: ' + averageGasPrice_1);
    /* Create json.file */
    archive.createJson(xobj);
    /* Send POST do destiny */
    archive.sendPost(yobj);
} //End If
