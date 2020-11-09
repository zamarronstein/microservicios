"use strict";

const express = require("express");
const app = express();
const body_parser = require('body-parser');

app.use(body_parser.json()); // user json for body requests

const mongoose = require("mongoose");

require("./Book");

mongoose.connect("mongodb://172.21.0.3:27017/books-service",  { useNewUrlParser: true });

const Book = mongoose.model("Book");

app.get('/', (req, res) => {
    res.send("This is the books service!");
});

app.post('/book', (req, res) => {
    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    };

    let book = new Book(newBook);

    book.save().then(() => 
        console.log("New book created!")
    ).catch((err) => {
        if (err) {
            console.log(err);
            throw err;
        }
    });

    res.send("A new book was created!");
});

app.listen(3000, () => {

    console.log("Up and running! -- This is our books service!");
});