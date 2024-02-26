var express = require('express');
const { userFormSignup, userFormLogin } = require('../controller/apis');
var router = express.Router();


router.post('/signupuser', userFormSignup),
  router.post('/loginuser', userFormLogin),

  module.exports = router;
