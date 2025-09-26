const { posts, Post, comments, Comment } = require('../models/post');


class PostController {
    static getAllPosts(req, res) {
        res.json(posts);
    }
    static createPost(req, res) {
        const { title, content } = req.body || {};

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

       const newPost = new Post(title, content);
        posts.push(newPost); 
        res.status(201).json(newPost);
        
        
    }
     static getAllComments(req, res) {
        const postId = Number(req.params.postId);
        const postComments = comments.filter(c => c.postId === postId)
        res.json(postComments);
    }
    static createComment(req, res) {
        const { postId, content} = req.body || {};

        if (!postId || !content) {
            return res.status(400).json({ error: 'Post ID and content are required' });
        }
        const post = posts.find(p => p.id === Number(postId));
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const newComment = new Comment(Number(postId), content);
        comments.push(newComment);
        res.status(201).json(newComment)
    }
   
}

module.exports = PostController;
