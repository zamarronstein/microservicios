const address = {
    alias: 'a',
    demandOption: true,
    desc: 'Address or city for get a weather!'
};

const argv = require('yargs')
    .options({ address })
    .help().argv;

module.exports = {
    argv
}