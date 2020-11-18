const { createFile, printTable } = require('./multiplicar');
const args = require('yargs').command('list', 'Print a multiply table', {
    limit: {
        alias: 'l',
        default: 10
    },
    base: {
        alias: 'b',
        demandOption: true
    }
}).command('create', 'Creates a file with a multiply table', {
    limit: {
        alias: 'l',
        default: 10
    },
    base: {
        alias: 'b',
        demandOption: true
    }
}).help().argv;

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

//console.log(args._[0]);

/**

**/