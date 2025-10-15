const express = require('express');
const Router = express.Router();
const postController = require('../controllers/postController');

Router.get('/', postController.getAllPosts);
Router.post('/', postController.createPost);

Router.get('/:postId/comments',postController.getAllComments);
Router.post('/:postId/comments',postController.createComment);

module.exports = Router;