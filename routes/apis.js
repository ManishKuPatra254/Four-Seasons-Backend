var express = require('express');
const { userFormSignup, userFormLogin, getUserById } = require('../controller/apis');
var router = express.Router();


router.post('/signupuser', userFormSignup),
  router.post('/loginuser', userFormLogin),
  router.get('/getUserById/:id', getUserById),

  // router.get('/getDataById/:id', getUserById);


  module.exports = router;
