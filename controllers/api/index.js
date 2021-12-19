//Purpose of file is to collect all of the API routes and package them up

const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes');
const homeRoutes = require('../home-routes');

//creates the endpoints ('/users','/posts','/comments')
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/', homeRoutes);

module.exports = router;