import { useMutation } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/comment.css';

// Import Auth
import Auth from '../../utils/auth';

// Add mutations
import { REMOVE_COMMENT } from '../../utils/mutations';

const CommentList = ({
    comments = [],
    storyId
}) => {
    const [removeComment] = useMutation(REMOVE_COMMENT)

    const handleDeleteComment = async (storyId, commentId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeComment({
                variables: { storyId, commentId }
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
        };
    }

    if (!comments.length) {
        return <p>No comments yet!</p>
    }

    return (
        <div className='comment-section'>
            <h3 className='comment-heading'>
                Comments
            </h3>
            <div className='flex-row my-4'>
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id} className="comment-border">
                            <div className='comment-card-header'>
                                <p className='comment-author-createdat'>
                                    <Link to={`/profiles/${comment.commentAuthor}`} className="comment-author-style">
                                        {comment.commentAuthor}
                                    </Link> commented on {comment.createdAt}</p>
                            </div>
                            <div className='comment-card-body'>
                                <p className='comment-text'>
                                    {comment.commentText}
                                </p>
                            </div>
                            <button className='btn btn-style' onClick={() => handleDeleteComment(storyId, comment._id)}>
                                Delete comment
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommentList;