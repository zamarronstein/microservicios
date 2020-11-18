const options = {
    limit: {
        alias: 'l',
        default: 10
    },
    base: {
        alias: 'b',
        demandOption: true
    }
};

const args = require('yargs')
    .command('list', 'Print a multiply table', options)
    .command('create', 'Creates a file with a multiply table', options)
    .help().argv;

module.exports = { args };