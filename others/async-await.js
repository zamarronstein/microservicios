/** 
 * Async Await
 */

let empleados = [{
    id: 1,
    nombre: 'Juan'
}, {
    id: 2,
    nombre: 'José'
}, {
    id: 3,
    nombre: 'Lezly'
}];

let salarios = [{
    id: 1,
    salario: 3000
}, {
    id: 2,
    salario: 2500
}];

let getEmpleado = async(id) => {

    let empleadoDB = empleados.find(empleado => empleado.id === id);

    if (!empleadoDB) {
        throw new Error(`No existe un empleado con el ID ${id}`);
    } else {
        return empleadoDB;
    }
}

let getSalario = async(empleado) => {

    let salarioDB = salarios.find(salario => salario.id === empleado.id);

    if (!salarioDB) {
        throw new Error(`No se encontró un salario para el empleado ${empleado.nombre}`);
    } else {
        return salarioDB;
    }
}

let getMensaje = async(id) => {

    let empleado = await getEmpleado(id);
    let salario = await getSalario(empleado);

    return `El empleado ${empleado.nombre} tiene un salario de ${salario.salario}`;
};

getMensaje(3)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));