"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var Archive = /** @class */ (function () {
    function Archive(dirPrices, dirSpents, dirSupplies) {
        this.prices = JSON.parse(fs.readFileSync(dirPrices, 'utf8'));
        this.spents = JSON.parse(fs.readFileSync(dirSpents, 'utf8'));
        this.supplies = JSON.parse(fs.readFileSync(dirSupplies, 'utf8'));
    }
    Archive.prototype.createJson = function (obj) {
        var json = JSON.stringify(obj);
        fs.writeFile("./server/file.json", json, 'utf8', function (err) {
            if (err)
                throw err;
            console.log('Created');
        });
    };
    return Archive;
}());
exports.default = Archive;
