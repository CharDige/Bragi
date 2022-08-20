import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import '../../styles/comment.css'

// Import mutations
import { ADD_COMMENT } from '../../utils/mutations';

// Import Auth
import Auth from '../../utils/auth';

const CommentForm = ({ storyId }) => {
    const [commentText, setCommentText] = useState('');

    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addComment({
                variables: {
                    storyId,
                    commentText,
                    commentAuthor: Auth.getProfile().data.username,
                },
            });

            setCommentText('');
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'commentText') {
            setCommentText(value);
        }
    };

    return (
        <div>
            {Auth.loggedIn() ? (
                <div className='comment-form-margin'>
                    <h3 className='comment-heading'>
                        Like the story? Leave a comment
                    </h3>
                    <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
                        <div className='col-12'>
                            <textarea name="commentText" placeholder='Add your comment' value={commentText} className="form-control input-style form-input-style" onChange={handleInputChange} rows="3"></textarea>
                        </div>

                        <div className='col-12'>
                            <button className="btn add-comment-btn-style" type="submit">
                                Add comment
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </div>
            ) : (
                <p className='error-message'>
                    Whoops! You need to be logged in to look add a comment. Please{' '}
                    <Link to="/login" className='login-signup-link'>login</Link> or <Link to="/signup" className='login-signup-link'>signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;