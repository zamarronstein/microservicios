const fs = require('fs');

let printTable = (base, limit) => {

    let content = '';

    for (let i = 1; i <= limit; i++) {
        content += `${base} * ${i} = ${base * i}\n`;
    }

    console.log(content);
};

let createFile = (base, limit) => {

    return new Promise((resolve, reject) => {

        if (!Number(base)) {
            reject(`El valor introducido de base (${base}) no es un número!`);
            return;
        }

        let content = '';

        for (let i = 1; i <= limit; i++) {
            content += `${base} * ${i} = ${base * i}\n`;
        }

        fs.writeFile(`tablas/tabla-${base}.txt`, content, (err) => {

            if (err) {
                reject(`Ha habido un error al procesar la tabla del ${base}, ${err}`);
            }

            resolve(`tabla-${base}.txt`);
        });
    });
};

module.exports = {
    createFile,
    printTable
};