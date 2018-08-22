import Archive from "./archive";
import fetch from 'node-fetch';

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
    
    prices.map(function(price) {
        return totalDayPrice += price.value;
    }); 

    prices.map(function(price) {
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
        });

    });
    
    const test = []
    
    supplies.map((value) => {
        return test.push({ 
            date: value.date,
            value: -1
        });
    })

    litersSupplied.forEach(element => {
        test.forEach(el => {
            if(element.date === el.date) {
                el.value = element.value * 12;
            }
        });
    });

    supplies.map((supply) => {
        test.map((ts) => {
            if(ts.value === -1 && ts.date === supply.date) {
                let liters = (supply.value / averageGas) * 12;
                // console.log(liters + ' x ' + dateSuplied);
                ts.value = liters;
            }
        })
    })
    
    /* Resultado 1 */
    test.map((values) => {
        console.log(values)
    })  

    // ///////////////////////////////////
    /* Average Km that can be road */
    let totalDay: number = 0;
    let countY: number = 0;
    
    test.map(function(liter) {
        return totalDay += liter.value;
    }); 

    test.map(function(test) {
        return countY ++;
    }); 

    let averageKm = totalDay / countY;

    // ///////////////////////////////////


    //teste contem quantos km é possível que o veiculo ande de acordo com os litros comprados por dia

    let kmDay = [];
    let etcx = [];

    spents.forEach(element => {
        kmDay.push({
            date: element.date,
            value: -1
        })
    });

    kmDay.forEach(km => {
        test.forEach(ts => {
            if(km.date === ts.date) {
                km.value = ts.value
            } else if (km.date !== ts.date && km.value === -1) {
                km.value = averageKm;
            }
        });
    });

    kmDay.map((value) => {
        console.log(value)
    })

    // OK ^

    //Validação e verificação de valores


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

    console.log('Average Gas Per Day: ' + averageGas);
    console.log('Average Km per Day: ' + averageKm);

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

