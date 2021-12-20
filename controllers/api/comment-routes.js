const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Comment } = require('../../models');

// GET /api/comments; get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        // Query configuration
        attributes: [
            'id',
            'comment_text',
            'post_id',
            'created_at',
          ],
        order: [['created_at', 'DESC']], 
        include: [
            {
            model: Post,
            attributes: ['title']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
    // check the session; ensures that only logged-in users interact with the database
    if (req.session) {
        Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        // use the id from the session
        user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});


// Delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
        return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;