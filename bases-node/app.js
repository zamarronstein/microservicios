const { createFile, printTable } = require('./multiplicar');

const args = require('./config/yargs').args;

let comando = args._[0];

switch (comando) {
    case 'list':
        printTable(args.base, args.limit);
        break;
    case 'create':
        createFile(args.base, args.limit).then((file) => {
            console.log(`Archivo creado ${file}`);
        }).catch((err) => {
            console.log(err);
        });
        break;
    default:
        console.log('Command not found!');
}