const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

require('colors');

console.clear()

const main = async ( ) => {
        console.log('Hola Mundo');

        let opt = ''
        const tareas = new Tareas();

        const tareasDB = leerDb()
        

        if (tareasDB) {
            tareas.cargarTareasFromArray(tareasDB)
        }


        do {
            //Imprimir el menu
            console.clear()
            opt =  await inquirerMenu();
            
            switch (opt) {
                case '1':
                    const descripcion = await leerInput('Descripcion: ')
                    tareas.crearTarea(descripcion)
                    break;
                case '2':
                    tareas.listadoCompleto()
                    break;
                case '3':
                    tareas.listarPendientesCompletadas(true)
                    break;
                case '4':
                    tareas.listarPendientesCompletadas(false)
                    break;
                case '5':
                    const ids = await mostrarListadoChecklist(tareas.listadoArr)
                    tareas.toggleCompletadas(ids)
                    console.log(ids);
                    break;
                case '6':
                    const id = await listadoTareasBorrar(tareas.listadoArr)
                    if (id !== '0'){
                        const ok = await confirmar('¿Esta seguro?')
                        if (ok){
                            tareas.borrarTarea(id)
                            console.log('Tarea borrada');
                        }
                    }
                    break;
            }

            guardarDB(tareas.listadoArr)

            console.log('\n');
            await pausa();

        } while ( opt !== '0' );


}



main()