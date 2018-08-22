"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = require("node-fetch");
var fs = require("fs");
var Archive = /** @class */ (function () {
    function Archive(dirPrices, dirSpents, dirSupplies) {
        this.prices = JSON.parse(fs.readFileSync(dirPrices, 'utf8'));
        this.spents = JSON.parse(fs.readFileSync(dirSpents, 'utf8'));
        this.supplies = JSON.parse(fs.readFileSync(dirSupplies, 'utf8'));
    }
    Archive.prototype.createJson = function (obj) {
        var json = JSON.stringify(obj);
        fs.writeFile("./server/desafio.json", json, 'utf8', function (err) {
            if (err)
                throw err;
            console.log('Json file Created');
        });
    };
    Archive.prototype.sendPost = function (obj) {
        var url = 'https://challenge-for-adventurers.herokuapp.com';
        var id = '5b7c0c20cf8c8200147dcdc5';
        console.log("Iniciando POST para: " + url + "/check?" + id);
        node_fetch_1.default(url + "/check?id=" + id, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(function (res) { return res.json(); })
            .then(function (json) { return console.log(json); });
    };
    Archive.prototype.getAverage = function (obj) {
        var totalDayPrice = 0;
        var countX = 0;
        obj.forEach(function (element) {
            totalDayPrice += element.value;
            countX++;
        });
        return (totalDayPrice / countX);
    };
    return Archive;
}());
exports.default = Archive;
