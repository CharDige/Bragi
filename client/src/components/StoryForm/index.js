import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// Add mutations and queries
import { ADD_STORY } from '../../utils/mutations';
import { QUERY_STORIES, QUERY_ME } from '../../utils/queries';

// Import authenication utility
import Auth from '../../utils/auth';

const StoryForm = () => {
    const [storyTitle, setStoryTitle] = useState('');
    const [storyDescription, setStoryDescription] = useState('');
    const [storyContent, setStoryContent] = useState('');
    const [storyGenre, setStoryGenre] = useState('');
    const [storyChannel, setStoryChannel] = useState('');

    const [addStory, { error }] = useMutation(ADD_STORY, {
        update(cache, { data: { addStory } }) {
            try {
                const { stories } = cache.readQuery({ query: QUERY_STORIES });

                cache.writeQuery({
                    query: QUERY_STORIES,
                    data: { stories: [addStory, ...stories] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, stories: [...me.stories, addStory] } },
            });
        },
    });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addStory({
                variables: {
                    storyTitle,
                    storyDescription,
                    storyContent,
                    storyGenre,
                    storyChannel,
                    storyAuthor: Auth.getProfile().data.username,
                },
            });

            setStoryTitle('');
            setStoryDescription('');
            setStoryContent('');
            setStoryGenre('');
            setStoryChannel('');
        } catch (err) {
            console.error(err);
        }
    };
    
}