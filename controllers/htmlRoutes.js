const router = require('express').Router();
const { User, Post } = require('../models');

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

module.exports = router;