import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

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
            <p>
                Comment
            </p>

            {Auth.loggedIn() ? (
                <>
                    <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
                        <div className='col-12 col-lg-9'>
                            <textarea name="commentText" placeholder='Add your comment' value={commentText} className="form-input w-100" onChange={handleInputChange}></textarea>
                        </div>

                        <div className='col-12 col-lg-3'>
                            <button className="btn" type="submit">
                                Add comment
                            </button>
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <p>
                    You need to be logged in to look at stories. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
};

export default CommentForm;