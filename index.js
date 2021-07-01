require('dotenv').config()

const {leerInput,inquirerMenu,pausa,listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

// console.log(process.env)

const main = async ()=>{
    let opt ;
    const busquedas = new Busquedas();

    do{
        opt = await inquirerMenu();
        
        switch (opt) {
            case 0:
                console.log('salir')
            break;
            case 1:
                const termino   = await leerInput('Ciudad')
                const lugares   = await busquedas.ciudad(termino);
                const idSelect  = await listarLugares(lugares)
                if(idSelect ==='0') continue;
                const lugarSel  = lugares.find(l=>l.id ===idSelect);
                busquedas.agregarHistorial(lugarSel.nombre);
                const clima     = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
                console.log(`id:${lugarSel.id}`);
                console.log(`nombre:  ${lugarSel.nombre.green}`)
                console.log(`lng: ${lugarSel.lng}`)
                console.log(`lat: ${lugarSel.lat}`)
                console.log('desc:', clima.desc.green);
                console.log('min :', clima.min);
                console.log('max :', clima.max);
                console.log('temp:', clima.temp);
            
            break;
            case 2:
                // console.log(busquedas.leerDB())
                
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx  = `${i + 1 }.`.green;
                    console.log(`${idx}  ${lugar}`);
                });
               
            break;    
        }
        if(opt !==0) await
          pausa()
    }while(opt !==0);


}
 
main()