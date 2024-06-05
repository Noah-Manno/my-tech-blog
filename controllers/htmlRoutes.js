const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/withAuth')
const withoutAuth = require('../utils/withoutAuth')

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
router.get('/login', withoutAuth, (req, res) => { res.render('login') });
router.get('/signup', withoutAuth, (req, res) => { res.render('signup'); });
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });
        const posts = postData.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;