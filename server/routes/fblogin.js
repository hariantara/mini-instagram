var express = require('express');
var router = express.Router();
var fbController = require('../controller/fbController')
/* GET home page. */

router.get('/login', fbController.facebookLogin);

module.exports = router;
