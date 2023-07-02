const express = require('express');

const router = express.Router();

router.get('/',(req,res,next) => {
try {
    res.render('home',{
        title: 'home'
    })
    } catch(err) {
        console.error(err);
        next(err);
    }
})
router.get('/login',(req,res,next) => {
    try {
        res.render('login',{
            title: 'test'
        })
        } catch(err) {
            console.error(err);
            next(err);
        }
    })
module.exports = router;