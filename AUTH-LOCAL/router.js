const router = require('express').Router();
const restrict = require('./middlewares/restrict')
const restrictJWT = require('./middlewares/restrictJWT')
const restrictSuperAdmin = require('./middlewares/restrictSuperAdmin')

const auth = require('./controllers/authController')
const passport = require('./lib/passport')


router.get('/', restrict, (req, res) => res.render('index'))
router.get('/register' , (req, res) => res.render('register'))
router.post('/register' , auth.register)

router.get('/login', (req, res) => res.render('login'))

router.post('/login', 
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    })
)

router.post('/api/v1/auth/login', auth.login)
router.get('/whoami', restrict, auth.whoami)
router.get('/api/v1/auth/whoami', restrictJWT, auth.whoamiJWT)
router.post('/api/v1/auth/register', restrictSuperAdmin, auth.registerJWT)

module.exports = router;