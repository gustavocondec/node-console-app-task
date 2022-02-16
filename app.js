require('colors')

const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList } = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

console.clear()

const main = async () => {

    let opt = ''
    const tareas = new Tareas()
    tareas.cargarTareasFromArray()
    do {
        opt = await inquirerMenu()
        switch (opt) {
            case '1': {
                const desc = await leerInput('Description: ')
                tareas.crearTarea(desc)
                break;
            }
            case '2': {
                tareas.listadoCompleto()
                break
            }
            case '3': {
                tareas.listarPendientesCompletadas()
                break
            }
            case '4': {
                tareas.listarPendientesCompletadas(false)
                break
            }
            case '5': {
                let ids = await mostrarListadoCheckList(tareas.listadoArr)
                console.log('ids', ids)
                tareas.toggleCompletadas(ids)
                break
            }
            case '6': {
                let id = await listadoTareasBorrar(tareas.listadoArr)
                if (id == '0') break;
                const ok = await confirmar('¿Esta Seguro?')
                if (ok) tareas.borrarTarea(id)
                break
            }
        }
        guardarDB(tareas.listadoArr)
        await pausa()
    } while (opt !== '0')
}

main()

