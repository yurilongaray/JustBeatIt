const fs = require('fs');

class Archive {

    public prices: any;
    public spents: any;
    public supplies: any;
    
    constructor(dirPrices: string, dirSpents: string, dirSupplies: string) {
        this.prices = JSON.parse(fs.readFileSync(dirPrices, 'utf8'));
        this.spents = JSON.parse(fs.readFileSync(dirSpents, 'utf8'));
        this.supplies = JSON.parse(fs.readFileSync(dirSupplies, 'utf8'));
    }

}

export default Archive;