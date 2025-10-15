import React from "react";

function CreateComment() {
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            setTitle('');
            setContent('');
            alert('Comment created');
        } else {
            alert('Error creating comment');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <textarea 
                placeholder='Content'
                value={content}
                onChange={e => setContent(e.target.value)}
            />
            <button type='submit'>Add comment</button>
        </form>
    )
}