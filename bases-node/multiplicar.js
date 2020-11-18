const fs = require('fs');
const colors = require('colors');

let printTable = (base, limit) => {
    colors.enable();
    console.log('*******************************************************'.green);
    console.log(`Tabla de multiplicar del ${base} al ${limit}`.green);
    console.log('*******************************************************'.green);
    for (let i = 1; i <= limit; i++) {
        console.log(`${base} * ${i} = ${base * i}`.yellow);;
    }
    colors.disable();
};

let createFile = (base, limit) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor introducido de base (${base}) no es un número!`.red);
            return;
        }

        let content = '';

        for (let i = 1; i <= limit; i++) {
            content += `${base} * ${i} = ${base * i}\n`;
        }

        fs.writeFile(`tablas/tabla-${base}.txt`, content, (err) => {

            if (err) {
                reject(`Ha habido un error al procesar la tabla del ${base}, ${err}`.red);
            }

            resolve(`tabla-${base}.txt`);
        });
    });
};

module.exports = {
    createFile,
    printTable
};