const express = require('express');

const router = express.Router();

const { isNotLoggedIn } = require('../middlewares/index');

router.get('/',(req,res,next) => {
    res.render('home',{
        title: 'home'
    });
});

router.get('/login', isNotLoggedIn, (req,res,next) => {
    res.render('login',{
        title: 'Sign In'
    });
});

router.get('/join', isNotLoggedIn, (req,res,next) => {
    res.render('login',{
        title: 'Sign Up'
    });
});

module.exports = router;