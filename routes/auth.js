const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { isLoggedIn, isNotLoggedIn } =require('../middlewares');

const router = express.Router();

// POST /auth/join
router.post('/join',isNotLoggedIn,async (req,res,next) => {
    const { nick, password } = req.body;
    try {
        const exUser = await User.findOne({where: { nick }});
        if (exUser) {
            return res.redirect('/join?error=exist')
        } 
        const hash = await bcrypt.hash(password,12);
        await User.create({
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

// POST /auth/login
router.post('/login',isNotLoggedIn,(req,res,next) => {
    passport.authenticate('local',(authError, user, info) => {
        if(authError) {
            console.error(authError);
            return next(authError);
        }
        if(!user) {
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res,next);
});

// GET /auth/logout
router.get('/logout',isLoggedIn,(req,res) => {
    req.logout(()=> {
        res.redirect('/');
    })
});


module.exports = router;