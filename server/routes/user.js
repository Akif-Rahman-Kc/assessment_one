const { Router } = require('express');
const { getOtp, userRegister, login } = require('../controller/userConroller');
const router = Router();

router.post('/get_otp', getOtp)
router.post('/verify_otp', userRegister)
router.post('/login', login)

module.exports = router;