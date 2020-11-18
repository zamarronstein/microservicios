const fs = require('fs');
const colors = require('colors');

let listToDo = [];

const loadDB = () => {

    try {
        listToDo = require('../db/data.json');
    } catch (err) {
        listToDo = [];
    }
};

const getJobs = () => {

    loadDB();

    return listToDo;
};

const saveDB = () => {

    let data = JSON.stringify(listToDo);


    fs.writeFile('db/data.json', data, (err) => {
        if (err) {
            throw new Error('Cant save data on DB!'.red, err);
        }

        console.log('To-do job has been saved successfully!');
    });
};


const create = (description) => {

    loadDB();

    let toDo = {
        description,
        completed: false
    };

    listToDo.push(toDo);

    saveDB();

    return toDo;
};

const update = (description, completed = true) => {

    loadDB();

    let index = listToDo.findIndex((job) => job.description === description);

    if (index >= 0) {
        listToDo[index].completed = completed;
        saveDB();
        return true;
    } else {
        return false;
    }
};

const remove = (description) => {

    loadDB();

    let originalSize = listToDo.length;
    listToDo = listToDo.filter(job => job.description !== description);
    let removedSize = listToDo.length;

    if (originalSize > removedSize) {
        saveDB();
        return true;
    } else {
        return false;
    }
};

module.exports = {
    create,
    getJobs,
    update,
    remove
};