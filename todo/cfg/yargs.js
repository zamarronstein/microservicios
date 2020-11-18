const description = {
    alias: 'd',
    demandOption: true
};
const options = {
    description,
    completed: {
        alias: 'c',
        default: true
    }
};

const args = require('yargs')
    .command('create', 'Creates a new to-do job', options)
    .command('update', 'Updates a to-do job', options)
    .command('delete', 'Deletes a to-do job by desc.', { description })
    .help().argv;

module.exports = {
    args
};