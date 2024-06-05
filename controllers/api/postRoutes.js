const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with this ID.' });
            return;
        }

        res.status(200).json({ message: 'Post updated successfully.' });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No project with that this id.' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;