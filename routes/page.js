const express = require('express');

const router = express.Router();

const { isLoggedIn,isNotLoggedIn } = require('../middlewares/index');

const { User, Post, Comment} = require('../models/index')

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

router.get('/login', isNotLoggedIn, (req,res) => {
    res.render('login',{
        title: 'Login'
    });
});

router.get('/join', isNotLoggedIn, (req,res) => {
    res.render('login',{
        title: 'Sign Up'
    });
});

router.get('/write', isLoggedIn, (req,res) => {
    res.render('write',{
        title: 'Posting'
    });
});

router.get('/detail/:id', async (req,res,next) => {
    try {
        const detailId = req.params.id;
        const post = await Post.findOne({where: {id : detailId}});
        const comments = await Comment.findAll({where: {postId : detailId}});
        if (post) {
            res.render('detail',{
                title: post.title,
                post,
                comments
            })
        } else {
            res.status(404).send('No post Founded')
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
})

router.get('/delete/:id', async (req,res,next) => {
    try {
        const postId = req.params.id;
        await Post.destroy({where:{id : postId}});
        res.redirect('/');
    } catch(err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;