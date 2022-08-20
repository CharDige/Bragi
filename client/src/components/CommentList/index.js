import React from 'react';
import { Link } from 'react-router-dom';

const CommentList = ({
    comments = []
}) => {

    if (!comments.length) {
        return <p>No comments yet!</p>
    }

    return (
        <>
            <h3>
                Comments
            </h3>
            <div className='flex-row my-4'>
                {comments &&
                    comments.map((comment) => (
                        <div key={comment._id} className="col-12">
                            <div className='comment-card-header'>
                                <p>
                                    <Link to={`/profiles/${comment.commentAuthor}`}>
                                    {comment.commentAuthor}
                                    </Link> commented on {comment.createdAt}</p>
                            </div>
                            <div className='card-body'>
                                <p>
                                    {comment.commentText}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default CommentList;