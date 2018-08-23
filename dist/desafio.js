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
if (prices && spents && supplies) {
    var startDate = new Date("2017-01-22"); //21-01-2017 
    var endDate = new Date("2018-07-28"); //26-07-2018
    var dates = archive.getDateArray(startDate, endDate);
    /* Adding all the dates */
    dates.map(function (value) {
        xobj.push({
            date: value.date,
            spentLiters: 0,
            suppliedLiters: 0,
            priceGas: 0,
            supplyTillHere: 0,
            spentTillHere: 0,
            // yesterdayGasRemain: 0,
            presentGas: 0
        });
    });
    /* Adding spentLiters */
    xobj.forEach(function (obj) {
        spents.forEach(function (spent) {
            if (obj.date === spent.date) {
                obj.spentLiters = (spent.value / 12);
            }
        });
    });
    /* Adding prices for Gas */
    xobj.forEach(function (obj) {
        prices.forEach(function (price) {
            if (obj.date === price.date) {
                obj.priceGas = price.value;
            }
        });
    });
    /* Getting priceGas validity */
    for (var i = 0; i < xobj.length; i++) {
        if (xobj[i - 1] !== undefined) {
            if (xobj[i].priceGas === 0) {
                xobj[i].priceGas = xobj[i - 1].priceGas;
            }
        }
    }
    /* Adding suppliedLiters */
    xobj.forEach(function (obj) {
        supplies.forEach(function (supply) {
            if (obj.date === supply.date) {
                obj.suppliedLiters = (supply.value / obj.priceGas);
            }
        });
    });
    /* Count session */
    for (var i = 0; i < xobj.length; i++) {
        if (xobj[i - 1] !== undefined) {
            xobj[i].supplyTillHere = xobj[i - 1].supplyTillHere + xobj[i - 1].suppliedLiters;
            xobj[i].spentTillHere = xobj[i - 1].spentTillHere + xobj[i - 1].spentLiters;
        }
        else {
            xobj[i].supplyTillHere = xobj[i].suppliedLiters;
            xobj[i].spentTillHere = xobj[i].spentLiters;
        }
    }
    /* Getting the disponible Gas */
    xobj.map(function (x) {
        x.presentGas = x.supplyTillHere - x.spentTillHere;
    });
    /* Debugger */
    xobj.map(function (value) {
        // console.log(value.date + ' ' + value.priceGas);
        console.log(value);
    });
    /* Creating the object destiny to POST */
    xobj.map(function (values) {
        // let result:number = parseFloat(((values.litersRemain !== 0) ? values.litersRemain : values.litersMissing).toFixed(2));
        var result = parseFloat(values.presentGas.toFixed(2));
        yobj.push({
            date: values.date,
            value: result
        });
    });
    /* Create json.file */
    archive.createJson(xobj);
    /* Send POST do destiny */
    archive.sendPost(yobj);
}
