const validURL = (request, response, next) => {

    const { URL } = request.body;

    const urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

    if (urlPattern.test(URL)) {

        next();

    } else {

        response.status(400).end(JSON.stringify({
            status: "error",
            message: "the provided URL is not valid"
        }));
    }
}

module.exports = { validURL };