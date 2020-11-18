const args = require('./cfg/yargs').args;
const colors = require('colors');
const { update } = require('./controller/to-do');
const toDo = require('./controller/to-do');

const command = args._[0];

switch (command) {
    case 'create':
        let job = toDo.create(args.description);
        console.log(job);
        break;
    case 'list':
        let jobs = toDo.getJobs();

        for (let job of jobs) {
            console.log('======== Jobs To Do ========'.green);
            console.log(job.description.gray);
            if (job.completed) {
                console.log('State: ', colors.green(job.completed));
            } else {
                console.log('State: ', colors.yellow(job.completed));
            }
            console.log('============================'.green);
        }
        break;
    case 'update':
        let updated = toDo.update(args.description, args.completed);

        if (updated) {
            console.log('Record updated successfully!'.green);
        } else {
            console.log(`Record ${args.description} has not updated!`.red);
        }
        break;
    case 'delete':
        let removed = toDo.remove(args.description);
        if (removed) {
            console.log(`Record ${args.description} has been deleted succesfully!!`.green);
        } else {
            console.log(`Record ${args.description} CANNOT BEEN DELETED!!`.red);
        }
        break;
    default:
        console.log('Commad not found!'.red);
}