const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth')

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({})
        const posts = postData.map((post) => post.get({ plain: true}));
        console.log(posts)
        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    try {
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;