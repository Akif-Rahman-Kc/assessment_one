const User  = require('../model/userSchema')
const bcrypt = require('bcrypt')
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
let SID

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    getOtp: async (req, res) =>{
        try {
            const { phoneNo } = req.body
            const phoneExist = await User.findOne({phoneNo: phoneNo });
            if (phoneExist) {
                res.json({status:'failed'})
            } else {
                client.verify.v2.services
                .create({friendlyName:'my web app'})
                .then((service) =>{
                    SID=service.sid;
                    client.verify.v2.services(service.sid)
                    .verifications.create({to:'+91'+phoneNo, channel: 'sms'})
                    .then(verification => console.log(verification.status))
        
                }
                ).catch((err) =>{
                    console.log(err)
                })
                res.json({status:'success'})
            }
        } catch (error) {
            console.log(error)
        }
    },
    userRegister: async (req, res) =>{
        try {
            const { firstName, lastName, email, password, phoneNo, otp } = req.body
            let validation
            await client.verify.v2.services(SID)
                .verificationChecks
                .create({to:'+91'+phoneNo, code: otp})
                .then((verification_check) => {
                validation= verification_check
            })
            if (validation.valid) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const user = await User.create(req.body);
                console.log(user,"====");
                res.json({user, status:'success'})
              } else {
                res.json({status:'failed'})
              }
            
        } catch (error) {
            console.log(error)
        }
    },
    login: async (req, res) =>{
        try {
            console.log(req.body);
            const {email, password } = req.body
            const phoneExist = await User.findOne({phoneNo: email });
        if (phoneExist) {
            const pass = await bcrypt.compare(password, phoneExist.password);
            if (pass) {
                res.json({user:phoneExist, status:'success'})
            } else {
                res.json({status:"failed", password:true})
            }
        } else {
            res.json({status:"failed", email:true})
        }
        } catch (error) {
            console.log(error)
        }
    },
}