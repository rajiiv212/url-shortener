require('dotenv').config();

const urlModel = require('../models/urlModel');
const shortCode = require('../utils/shortCode');
const { GET_Cache, SET_Cache } = require('../utils/cacheURL');

const userModel = require('../models/userModel');
const { validateToken } = require('../utils/webToken');


const selectURL = async (request, response) => {

    const { short } = request.params;

    let URL;

    if (short) {

        URL = await GET_Cache(short);

        if (URL == null) {

            URL = await urlModel.findOne({ ShortURL: short });

            if (URL) {

                URL.ClickCounts++;
                URL.save();

                URL = URL['LongURL'];
                SET_Cache(short, URL, 'EX', process.env.RedisCacheTime);

            } else {

                URL = process.env.REDIRECT;
            }

        } else {

            urlModel.findOne({ ShortURL: short }).then((thisURL) => {

                thisURL.ClickCounts++;
                thisURL.save();
            });
        }
    }

    response.status(302).redirect(URL);
};

const setURL = async (request, response) => {

    const { URL, customCode, userToken } = request.body;

    let short;

    if (customCode) {

        let user;

        if (userToken) {

            user = validateToken(userToken);

            if (!user) {

                response.status(401).end(JSON.stringify({
                    status: "error",
                    message: "the provided user token is not valid"
                }));

                return;
            }

        } else {

            response.status(401).end(JSON.stringify({
                status: "error",
                message: "you are not authorised to access the requested resource"
            }));

            return;
        }

        short = await urlModel.findOne({ ShortURL: customCode });

        if (short) {

            response.status(406).end(JSON.stringify({
                status: "error",
                message: "this custom URL already exists"
            }));

            return;
        }

        await urlModel({ LongURL: URL, ShortURL: customCode, ClickCounts: 0 }).save();

        short = customCode;

        userModel.findOne({ Email: `${user.userEmail}` })
            .then((thisUser) => {
                thisUser.URLs.push({
                    shortCode: customCode,
                    LongURL: URL,
                });
                thisUser.save();
            })
            .catch((error) => console.log(error.message));

    } else {

        short = await urlModel.findOne({ LongURL: URL });

        if (short == null) {

            short = shortCode();

            await urlModel({ LongURL: URL, ShortURL: short, ClickCounts: 0 }).save();

        } else if (short) {

            short = short['ShortURL'];

        }
    }

    SET_Cache(short, URL, 'EX', process.env.RedisCacheTime);

    response.status(201).end(JSON.stringify({
        status: "success",
        shortURL: `${process.env.ServerPROTOCOL}://${process.env.ServerHOST}/${short}`
    }));
};

module.exports = { selectURL, setURL };