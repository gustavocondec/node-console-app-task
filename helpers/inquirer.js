const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.red} Salir`
            },
        ]
    }
]

const inquirerMenu = async () => {

    console.clear()
    console.log('============================'.green)
    console.log('   Seleccione una opcion'.white)
    console.log('===========================\n'.green)

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion

}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]
    await inquirer.prompt(question)

}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (value) => {
                if (value.length === 0) return 'Por Favor ingrese un valor'
                else return true
            }
        }
    ]
    const { desc } = await inquirer.prompt(question)
    return desc
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${index + 1}. `.green + tarea.desc
        }
    })
    choices.unshift({
        value: '0',
        name: 'Cancelar'
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id
}

const mostrarListadoCheckList = async (tareas = []) => {
    const choices = tareas.map((tarea, index) => {
        return {
            value: tarea.id,
            name: `${index + 1}. `.green + tarea.desc,
            checked: tarea.completadoEn ? true : false
        }
    })
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}


const confirmar = async (message = '') => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)
    return ok
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}