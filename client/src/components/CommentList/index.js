import React from 'react';

const CommentList = ({ comments = [] }) => {
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
                    comments.map((comment) => {
                        <div key={comment._id} className="col-12 mb-3 pb-3">
                            <div className='card-header'>
                                <p>{comment.commentAuthor} commented on {comment.createdAt}</p>
                            </div>
                            <div className='card-body'>
                                <p>
                                    {comment.commentText}
                                </p>
                            </div>
                        </div>
                    })}
            </div>
        </>
    );
};

export default CommentList;