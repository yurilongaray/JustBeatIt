import Archive from "./archive";

//Todos os arquivos:
// const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');

if(archive.prices && archive.spents && archive.supplies) {

    let prices = archive.prices; //array com as datas de alteração do preço do combustível.
    let spents = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    let supplies = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
    
    console.log('Existem dados');

    const suppliesDates = supplies.map((supply) => {
        return supply.date;
    })
    
    /* Average Liter Price per Day */
    let totalDayPrice: number = 0;
    let countX: number = 0;
    
    const X = prices.map(function(price) {
        return totalDayPrice += price.value;
    }); 

    const Y =  prices.map(function(price) {
        return countX ++;
    }); 
    
    //Average Result:
    let averagePricePerDay = totalDayPrice / countX;
    console.log(totalDayPrice + ' - ' + countX + ', Average per Day: ' + averagePricePerDay);

    /* Liters Suplied per Day */
    let litersSupplied = [];

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

    // console.log(suppliesDates)
 
    //litersSupplied is an array of Object that contains Liters paid per Day
    // litersSupplied.map(function(values) {
    //     return console.log(values);
    // });

    spents.forEach(spent => {
        litersSupplied.forEach(literSuplied => {

            if(spent.date === literSuplied.date) {
                // let litersRounded = Math.round(liters * 100) / 100;
                let dateDrove = spent.date;

            }
        })
    });
}

