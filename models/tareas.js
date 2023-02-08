const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const tarea = this._listado[key]
            listado.push(tarea)
        } 
        )
        return listado;
    }

    constructor(){
        this._listado = {}
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea

        })

    }
    

    crearTarea(descripcion = ''){
        
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto(){
        const tareasListado = this.listadoArr
       
        tareasListado.forEach((tarea, i) => {
            const index = `${i + 1}`.green
            const {descripcion, completadoEn} = tarea
            const estado = (completadoEn) ? "Completado".green : "Pendiente".red


            console.log(`${index} ${descripcion} ::  ${estado}`);

        });
            
        }
        
    listarPendientesCompletadas(completadas){

        const tareasListadoCompletadas = this.listadoArr
        let contador = 0;
        tareasListadoCompletadas.forEach((tarea, i) => {
            const {descripcion, completadoEn} = tarea
            const estado = (completadoEn === "Completado") ? "Completado".green : "Pendiente".red
            if (completadas){
                if (completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${descripcion} :: ${estado}`.green);
                }

            } else {
                if (!completadoEn) {
                    contador += 1
                    console.log(`${(contador + '.').green} ${descripcion} :: ${estado}`.green);
                }

            }




        });
            


    }

    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });
        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null
            }
        })
    }

}

module.exports = Tareas;

