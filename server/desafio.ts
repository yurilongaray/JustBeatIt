import Archive from "./archive";

//Todos os arquivos:
const archive = new Archive('/home/sofit/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/sofit/Área de Trabalho/DesafioDesafiante/server/spents.json','/home/sofit/Área de Trabalho/DesafioDesafiante/server/supplies.json');
// const archive = new Archive('/home/yuri/Área de Trabalho/DesafioDesafiante/server/prices.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/spents.json', '/home/yuri/Área de Trabalho/DesafioDesafiante/server/supplies.json');

if(archive.prices && archive.spents && archive.supplies) {

    let prices = archive.prices; //array com as datas de alteração do preço do combustível.
    let spents = archive.spents; //array com datas e uso do veículo em quilômetros (quilometragem percorrida no dia).
    let supplies = archive.supplies; //array com datas e abastecimentos do veículo em reais (não em litros).
    
    console.log('Existem dados');

    const suppliesDates = supplies.map((supplyDate) => {
        return supplyDate.date;
    });
    const pricesDates = supplies.map((priceDate) => {
        return priceDate.date;
    });

    ///////////////////////////////////
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
    let averageGas = totalDayPrice / countX;
    // console.log('Average per Day: ' + averageGas);

    /* Liters Suplied per Day */
    let litersSupplied = [];

    ////////////////////////////

    /* One Way X */
    supplies.forEach(supply => {
        
        prices.forEach(price => {

            if(price.date === supply.date) {

                const liters = (supply.value / price.value);
                const dateSuplied = supply.date;
                // console.log(liters + ' x ' + dateSuplied);
                
                return litersSupplied.push({date: dateSuplied, value: liters});
            } 
            // else {

            //     const liters = (supplie.value / averagePricePerDay);
            //     const dateSuplied = supplie.date;
            //     // console.log(litersRounded + ' x ' + dateSuplied);
                
            //     litersSupplied.push({date: dateSuplied, value: liters});
            // }
        });

    });
    
    const test = []
    
    supplies.map((value) => {
        return test.push({ 
            date: value.date,
            value: ''
        });
    })

    litersSupplied.forEach(element => {
        test.forEach(el => {
            if(element.date === el.date) {
                el.value = element.value;
            }
        });
    });

    supplies.map((supply) => {
        test.map((ts) => {
            if(ts.value === '' && ts.date === supply.date) {
                let liters = (supply.value / averageGas);
                // console.log(liters + ' x ' + dateSuplied);
                ts.value = liters;
            }
        })
    })
    
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
    
    let litersWasted = [];
    let etc = []

    spents.map((value) => {
        etc.push({
            date: value.date,
            value: ''
        })
    })

    spents.forEach(spent => {
        test.forEach(ts => {
            if(ts.date === spent.date) {
                let liters = (spent.value / ts.value);
                litersWasted.push({
                    date: ts.date,
                    value: liters
                })
            }
        })
    });

    etc.forEach(etc => { 
        litersWasted.forEach(lt => {
            if(etc.date === lt.date) {
                etc.value = lt.value
            }
        })
    })

    ///////////////////////////////////
    let totalDay: number = 0;
    let countY: number = 0;
    
    const Z = test.map(function(spent) {
        return totalDay += spent.value;
    }); 

    const V =  spents.map(function(spent) {
        return countY ++;
    }); 

    let averageKm = totalDay / countY;

    ///////////////////////////////////

    etc.map((etc) => {
        spents.map((spent) => {
            if(etc.value === '' && etc.date === spent.date) {
                let liters = (spent.value / averageKm);
                // console.log(liters + ' x ' + dateSuplied);
                etc.value = liters;
            }
        })
    })

    etc.map((value) => {
        console.log(value)
    })

    console.log('Average Gas Per Day: ' + averageGas);
    console.log('Average Km per Day: ' + averageKm);

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
}

