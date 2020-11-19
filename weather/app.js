const axios = require('axios');
const argv = require('./config/yargs').argv;
const config = require('./config/api').config;

let city = encodeURI(argv.address);

const instance = axios.create({
    baseURL: `${config.url}/weather?q=${city}&appid=${config.appid}`
});

instance.get().then((response) => {
    console.log(response);
}).catch((err) => {
    console.log('Error!!!', err);
});;