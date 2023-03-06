const userModel = require('../models/userModel');
const { validateToken } = require('../utils/webToken');

const selectUser = async (request, response) => {

    const { userToken } = request.body;

    if (userToken) {

        let validUser = validateToken(userToken);

        if (validUser) {

            user = await userModel.findOne({ Email: `${validUser.userEmail}` });

            response.status(200).end(JSON.stringify({
                status: "success",
                user: {
                    firstName: user.FirstName,
                    lastName: user.LastName,
                    email: user.Email,
                    URLs: user.URLs,
                },
            }));

            return;
        }
    }

    response.status(401).end(JSON.stringify({
        status: "error",
        message: "the provided user token is not valid"
    }));
}

module.exports = { selectUser };