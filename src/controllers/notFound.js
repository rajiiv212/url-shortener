const notFound = async (request, response) => {

    response.status(404).end(JSON.stringify({
        status: "error",
        message: "the requested resource does not exist"
    }));
};

module.exports = notFound;