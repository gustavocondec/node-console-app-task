const { leerDB } = require("../helpers/guardarArchivo")
const Tarea = require("./tarea")
require('colors');

class Tareas {
    _listado = {}

    get listadoArr() {
        let listado = []
        listado = Object.values(this._listado)
        return listado
    }
    constructor() {
        this._listado = {}
    }
    borrarTarea(id = '') {
        if (!this._listado[id]) return
        delete this._listado[id]
    }
    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea
    }
    cargarTareasFromArray() {
        let tareas = leerDB()
        tareas.forEach(el => {
            this._listado[el.id] = el
        })
    }
    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, index) => {
            let msg = `${index}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}`
            console.log(tarea.completadoEn ? msg.green : msg.red)
        })
    }
    listarPendientesCompletadas(completadas = true) {
        console.log()
        let tareas = this.listadoArr.filter(el => {
            if (completadas) return el.completadoEn
            else return !el.completadoEn
        })
        tareas.forEach((tarea, index) => {
            let msg = `${index}. ${tarea.desc} :: ${tarea.completadoEn ? 'Completada' : 'Pendiente'}`
            console.log(tarea.completadoEn ? msg.green : msg.red)
        })
    }
    toggleCompletadas(ids = []) {
        // marcar los nuevos completados
        ids.forEach(id => {
            if (this._listado[id].completadoEn) return;
            else {
                this._listado[id].completadoEn = new Date().toLocaleDateString()
            }
        })
        // desmarcar los no completados
        this.listadoArr.forEach(el => {
            if (!ids.includes(el.id)) this._listado[el.id].completadoEn = null
        })
    }
}


module.exports = Tareas