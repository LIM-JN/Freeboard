const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { isLoggedIn } = require('../middlewares/index');
const { Post } = require('../models/index');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req,file,cb) {
            cb(null, 'uploads/');
        },
        filename(req,file,cb) {
            const ext = path.extname(filename.originalname);
            cb(null,path.basename(file.originalname,ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

// POST /post/img

// POST /post
const upload2 = multer();
router.post('/',isLoggedIn, upload2.none(), async(req,res,next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            title: req.body.title,
            img: req.body.url,
            username: req.user.nick
        })
        res.redirect('/');
    } catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;