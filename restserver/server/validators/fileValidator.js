
let isValidExtension = (extension) => {

    const valid_extensions = process.env.VALID_EXTENSIONS.split(',');

    return valid_extensions.indexOf(extension) != -1;
};

let isValidType = (type) => {

    const valid_types = process.env.VALID_TYPES.split(',');

    return valid_types.indexOf(type) != -1;
};

module.exports = {
    isValidExtension,
    isValidType
};