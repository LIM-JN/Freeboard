const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');

const { isLoggedIn } = require('../middlewares/index');
const { Post,Comment } = require('../models/index');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb) {
            cb(null, 'uploads/');
        },
        filename(req,file,cb) {
            const ext = path.extname(file.originalname);
            cb(null,path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

// POST /post/img
router.post('/img',isLoggedIn, upload.single('img'),(req,res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

// POST /post
const upload2 = multer();
router.post('/',isLoggedIn, upload2.none(), async(req,res,next) => {
    try {
        const content = sanitizeHtml(req.body.content);
        const title = sanitizeHtml(req.body.title);
        await Post.create({
            content,
            title,
            img: req.body.url,
            username: req.user.nick
        })
        res.redirect('/');
    } catch(error) {
        console.error(error);
        next(error);
    }
})

// POST /post/comment/:id
router.post('/comment/:id',isLoggedIn, async(req,res,next) => {
    try {
        const postId = req.params.id;
        const content = sanitizeHtml(req.body.content);
        await Comment.create({
            content,
            postId,
            username: req.user.nick,
        })
        res.redirect(`/detail/${postId}`);
    } catch(err) {
        console.error(err);
        next(err)
    }
}) 

// POST /post/update/:id
router.post('/update/:id',isLoggedIn, async(req,res,next) => {
    try {
        const postId = req.params.id;
        const title = sanitizeHtml(req.body.title);
        const content = sanitizeHtml(req.body.content);
        await Post.update({
            title,
            content,
        }, {where: {id:postId}});
        res.redirect(`/detail/${postId}`);
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;