const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/withAuth');
const withoutAuth = require('../utils/withoutAuth');
const dateUtils = require('../utils/dateUtils');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: {
                model: User,
                attributes: { exclude: ['password'] },
            },
        });
        const posts = postData.map((post) => {
            const formattedPost = post.get({ plain: true });
            formattedPost.date_created = dateUtils.format_date(formattedPost.date_created);
            return formattedPost;
        });
        console.log(posts);
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', withoutAuth, (req, res) => { res.render('login') });
router.get('/signup', withoutAuth, (req, res) => { res.render('signup') });
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: {
                model: User,
                attributes: { exclude: ['password'] },
            },
        });
        const posts = postData.map((post) => {
            const formattedPost = post.get({ plain: true });
            formattedPost.date_created = dateUtils.format_date(formattedPost.date_created);
            return formattedPost;
        });
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/details/:id', async (req, res) => { 
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username'], 
                    },
                },
            ],
        });

        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });
        post.date_created = dateUtils.format_date(post.date_created);
console.log(post)
        res.render('details', {
            id: post.id,
            name: post.name,
            date_created: post.date_created,
            content: post.content,
            user: {
                username: post.user.username
            },
            logged_in: req.session.logged_in,
            comments: post.comments.map(comment => ({
                id: comment.id,
                content: comment.content,
                date_created: dateUtils.format_date(comment.date_created),
                user: {
                    username: comment.user.username,
                }
            }))
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/mypost/:id', async (req, res) => { 
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: {
                    model: User,
                    attributes: { exclude: ['password'] },
                },
        });

        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });
        post.date_created = dateUtils.format_date(post.date_created);
console.log(post)
        res.render('update', {
            id: post.id,
            name: post.name,
            date_created: post.date_created,
            content: post.content,
            user: {
                username: post.user.username
            },
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
