
class Post {
    static lastId = 0;
    constructor(title, content) {
        this.id = ++Post.lastId;
        this.title = title;
        this.content = content;
        this.createdAt = new Date();
    }
}

class Comment {
    static lastId = 0;
    constructor(postId, content) {
        this.id = ++Comment.lastId;
        this.postId = postId;
        this.content = content;
        this.createdAt = new Date();
    }
}

const posts = [];

const comments = [];


module.exports = { Post, posts, Comment, comments}