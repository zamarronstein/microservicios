const message = (name, msg) => {

    return {
        name, 
        msg, 
        time: new Date().getTime()
    };
};

module.exports = {
    message
};