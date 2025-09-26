const express = require('express');
const Router = express.Router();
const postController = require('../controllers/postController');

Router.get('/', postController.getAllPosts);
Router.post('/', postController.createPost);

Router.get('/:postId/comment',postController.getAllComments);
Router.post('/:postId/comment',postController.createComment);

module.exports = Router;