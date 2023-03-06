require('dotenv').config();

const express = require('express');
const router = express.Router();

const { validLogin, validSignup } = require('../middlewares/valid_Auth');
const { signin, signup } = require('../controllers/authController');

const { selectUser } = require('../controllers/userController');

const { validURL } = require('../middlewares/valid_URL');
const { selectURL, setURL } = require('../controllers/urlController');

const notFound = require('../controllers/notFound');

/*********** URL Getting and Setting ***********/

router.get('/:short', selectURL);
router.post('/short', validURL, setURL);

/*********** Authentication ********************/

router.post('/auth/signin', validLogin, signin);
router.post('/auth/signup', validSignup, signup);

/*********** Users Controller ******************/

router.post('/user', selectUser);

/***********************************************/

router.all('/*', notFound);

/***********************************************/

module.exports = router;