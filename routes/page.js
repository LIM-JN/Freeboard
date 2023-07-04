const express = require('express');

const router = express.Router();

const { isLoggedIn,isNotLoggedIn } = require('../middlewares/index');

const { User, Post } = require('../models/index')

router.use((req,res,next) => {
    res.locals.user = req.user;
    next();
})

router.get('/', async (req,res,next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model:User,
                attributes: ['id','nick'],
            },
            order: [['createdAt','DESC']],
        })
        res.render('home',{
            title: 'home',
            posts: posts,
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/login', isNotLoggedIn, (req,res,next) => {
    res.render('login',{
        title: 'Login'
    });
});

router.get('/join', isNotLoggedIn, (req,res,next) => {
    res.render('login',{
        title: 'Sign Up'
    });
});

router.get('/write', isLoggedIn, (req,res,next) => {
    res.render('write',{
        title: 'Posting'
    });
});

module.exports = router;