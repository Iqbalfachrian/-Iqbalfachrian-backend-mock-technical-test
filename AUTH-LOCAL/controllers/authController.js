// controllers/authController.js
const { user } = require('../models' )
//const passport = require('../lib/passport')
const jwt = require("jsonwebtoken");

function format(user) {
    const { id, username, isAdmin } = user
    return {
        id,
        username,
        isAdmin,
        accessToken : user.generateToken(),
    }
}

module.exports = {
    register : (req, res, next) => {
    // Kita panggil static method register yang sudah kita buat tadi
    user
       .register (req.body)
       .then(() => {
          res.redirect ('/login')
    })
    .catch(err => next(err))
},
    whoami: (req, res) => {
    /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
    res.render('profile', req.user.dataValues)
    },
    login: (req, res) => {
    // res.json(user.findAll({}))
    user.authenticateJWT(req.body)
    .then(user => {
    res.json(format(user))
        })
    },
    whoamiJWT: (req, res) => {
        const currentUser = req.user;
        res.json(currentUser)
    },
    registerJWT: async (req, res, next) => {
    //const {username, password, isAdmin} = req.body;
        // const salt = "binar";
        // console.log(req.headers);
        // const tokenJWT = req.headers.authorization;
        // var tokenDecoded = await jwt.verify(tokenJWT, salt);
        // console.log(tokenDecoded);
        // if(tokenDecoded.isAdmin != 1){
        //     return res.status(401).json({
        //         status: "unauthorized"
        //     })
        // }
    user
    .register (req.body)
    .then(() => {
    res.json({
        status: 'success'
      })
    })
    .catch(err => next(err))
    }
};