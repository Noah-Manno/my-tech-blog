const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({})
        const posts = postData.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

        res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
        res.render('signup');
});

router.get('/dashboard', withAuth, (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;