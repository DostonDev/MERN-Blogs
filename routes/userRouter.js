const router = require('express').Router()
const userCtrl = require('../controller/userCtrl')
const auth = require('../middleware/auth')


//Register User
router.post('/register',userCtrl.register)

//Login
router.post('/login',userCtrl.userlogin)

//verify
router.get('/verify',userCtrl.verfiedToken)


module.exports = router