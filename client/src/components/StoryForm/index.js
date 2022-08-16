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
    return (
        <div>
            <h2>
                Add your story
            </h2>

            {Auth.loggedIn() ? (
                <>
                    <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
                        <div className="col-12 col-lg-9">
                            <div className="mb-3">
                                <label htmlFor="storyTitle" className="form-label label-style">Story title</label>
                                <input value={storyTitle} name="name" type="text" className="form-control input-style" id="storyTitle" placeholder="Story title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storyDescription" className="form-label label-style">Story description</label>
                                <input value={storyDescription} name="name" type="text" className="form-control input-style" id="storyDescription" placeholder="Story description" />
                            </div>
                        </div>

                        <div className="btn" type="submit">
                            Add story
                        </div>
                        {error && (
                            <div className="col-12 my-3 bg-danger text-white p-3">
                                {error.message}
                            </div>
                        )}
                    </form>
                </>
            ) : (
                <>
                    <p>
                        Whoops! To add your stories, you need to be logged in. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">sign up.</Link>
                    </p>
                </>
            )}
        </div>
    );
};

export default StoryForm;