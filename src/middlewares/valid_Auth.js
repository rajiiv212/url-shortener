const { validName, validEmail, validPassword } = require('../utils/validParameters');

const validLogin = (request, response, next) => {

    const { email, password } = request.body;

    if (!validEmail(email)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided email is not valid"
        }));

        return;
    }

    if (!validPassword(password)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided paassword is not valid"
        }));

        return;
    }

    next();
};

const validSignup = (request, response, next) => {

    const { firstName, lastName, email, password } = request.body;

    if (!validName(firstName)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided first name is not valid"
        }));

        return;
    }

    if (!validName(lastName)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided last name is not valid"
        }));

        return;
    }

    if (!validEmail(email)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided email is not valid"
        }));

        return;
    }

    if (!validPassword(password)) {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the password must be at least 8 characters long."
        }));

        return;
    }

    next();
};

module.exports = { validLogin, validSignup };