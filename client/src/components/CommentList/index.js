import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({
    comments = []
}) => {

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
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CommentList;