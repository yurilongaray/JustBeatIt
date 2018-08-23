"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var archive_1 = require("./archive");
//Leitura dos arquivos (Home, Work):
var archive = new archive_1.default('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');
var prices = archive.prices; //alteração do preço do combustível.
var spents = archive.spents; //uso do veículo em quilômetros (quilometragem percorrida no dia).
var supplies = archive.supplies; //bastecimentos do veículo em reais (não em litros).
var xobj = []; //Objeto centralizador de informações
var yobj = []; //Objeto a ser enviado pelo POST
var count = 0; //Not used yet
if (prices && spents && supplies) {
    /* Average Liter Price per Day */
    var averageGasPrice_1 = archive.getAverage(prices);
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
            gasPrice: 0,
            litersSupplied: 0,
            kmToRoad: 0,
            // litersRemain: 0,
            // litersMissing: 0,
            yesterdayGasRemain: 0,
            presentGas: 0
        });
    });
    /* xobj / Price = ( price and average per day) */
    prices.forEach(function (price) {
        xobj.forEach(function (li) {
            if (price.date === li.date) {
                li.gasPrice = price.value;
            }
            else if (price.date !== li.date && li.gasPrice === 0) {
                li.gasPrice = averageGasPrice_1;
            }
        });
    });
    /* xobj / supplies = gas, money supplied and the total km to road */
    supplies.forEach(function (supply) {
        xobj.forEach(function (li) {
            if (supply.date === li.date) {
                li.litersSupplied = (supply.value / li.gasPrice);
                li.kmToRoad = (li.litersSupplied * 12);
            }
            else if ((supply.date !== li.date) && (li.gasSupplied === 0)) {
                li.litersSupplied = 'x';
                li.gasPrice = 'x';
                li.kmToRoad = 'x';
            }
        });
    });
    /* xobj litersRemain, litersMissing  */
    // xobj.map((li) => {
    //     let total;
    //     if(li.litersSupplied > li.litersSpent) {
    //         li.litersRemain = (li.litersSupplied - li.litersSpent)
    //     }
    //     else if(li.litersSupplied < li.litersSpent) {
    //         li.litersMissing = (li.litersSpent - li.litersSupplied)
    //     }
    // })
    /* Count session */
    for (var i = 0; i < xobj.length; i++) {
        if (xobj[i - 1] === undefined) {
            xobj[i].yesterdayGasRemain = 0;
            xobj[i].presentgas = xobj[i].litersSupplied;
        }
        else {
            xobj[i].yesterdayGasRemain = xobj[i - 1].litersSupplied - xobj[i - 1].litersSpent;
            xobj[i].presentGas = xobj[i].litersSupplied + xobj[i].yesterdayGasRemain;
        }
    }
    /* Passando para o Obj de destino */
    xobj.map(function (values) {
        // let result:number = parseFloat(((values.litersRemain !== 0) ? values.litersRemain : values.litersMissing).toFixed(2));
        var result = parseFloat(values.presentGas.toFixed(2));
        yobj.push({
            date: values.date,
            value: result
        });
    });
    /* Debugger */
    xobj.map(function (value) {
        console.log(value);
        console.log('');
    });
    console.log('AverageGasPrice: ' + averageGasPrice_1);
    /* Create json.file */
    archive.createJson(xobj);
    /* Send POST do destiny */
    archive.sendPost(yobj);
} //End If
