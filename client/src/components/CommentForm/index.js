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
}