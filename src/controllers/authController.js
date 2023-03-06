const userModel = require('../models/userModel');
const { newToken } = require('../utils/webToken');

const signin = async (request, response) => {

    const { email, password } = request.body;

    let user = await userModel.findOne({ Email: email, Password: password });

    if (user) {

        let token = newToken({
            userEmail: user.Email,
        });

        response.status(200).end(JSON.stringify({
            status: "success",
            userToken: `${token}`
        }));

        return;
    }

    response.status(401).end(JSON.stringify({
        status: "error",
        message: "the provided credentials are not valid"
    }));
};

const signup = async (request, response) => {

    let { firstName, lastName, email, password } = request.body;

    firstName = firstName.trim();
    lastName = lastName.trim();
    password = password.trim();

    let user = await userModel.findOne({ Email: email });

    if (user) {

        response.status(401).end(JSON.stringify({
            status: "error",
            message: "there is already a user with this email address"
        }));

        return;
    }

    await userModel({ FirstName: firstName, LastName: lastName, Email: email, Password: password }).save();

    response.status(201).end(JSON.stringify({
        status: "success",
        message: "the user has successfully registered"
    }));
};

module.exports = { signin, signup };