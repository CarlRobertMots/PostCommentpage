import { useState } from 'react';

function PostComment({ postId, onCommentAdded }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`/posts/${postId}/comment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });

        if (response.ok) {
            setContent('');
            onCommentAdded(); 
        } else {
            alert('Error adding comment');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                placeholder='Add a comment'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button type='submit'>Post Comment</button>
        </form>
    )
}

export default PostComment;
