const validEmail = (email) => {

    if (!email) return false;

    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validPassword = (password) => {

    if (!password) return false;

    if (password.trim().length < 8) return false;

    return true;
}

const validName = (name) => {

    if (!name) return false;

    if (name.trim().length < 1) return false;

    return true;
}

module.exports = { validName, validEmail, validPassword };