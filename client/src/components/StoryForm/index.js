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

                if (stories) {
                    cache.writeQuery({
                        query: QUERY_STORIES,
                        data: { stories: [addStory, ...stories] },
                    });
                }
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'storyTitle') {
            setStoryTitle(value);
        } else if (name === 'storyDescription') {
            setStoryDescription(value);
        } else if (name === 'storyContent') {
            setStoryContent(value);
        } else if (name === 'storyGenre') {
            setStoryGenre(value);
        } else {
            setStoryChannel(value);
        }
    }

    return (
        <div>
            <h2>
                Add your story
            </h2>

            {Auth.loggedIn() ? (
                <>
                    <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
                        <div className="col-12 form-input-margin">
                            <div className="mb-3">
                                <label htmlFor="storyTitle" className="form-label label-style">Story title</label>
                                <textarea value={storyTitle} name="storyTitle" className="form-control input-style form-input-style" id="storyTitle" placeholder="Story title" onChange={handleInputChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storyDescription" className="form-label label-style">Story description</label>
                                <textarea value={storyDescription} name="storyDescription" className="form-control input-style form-input-style" id="storyDescription" placeholder="Story description" onChange={handleInputChange} rows="3"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storyContent" className="form-label label-style">Story content</label>
                                <textarea value={storyContent} name="storyContent" className="form-control input-style form-input-style" id="storyContent" placeholder="Story content" onChange={handleInputChange} rows="10"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storyGenre" className="form-label label-style">Story genre</label>
                                <textarea value={storyGenre} name="storyGenre" className="form-control input-style form-input-style" id="storyGenre" placeholder="Story genre, like 'Action', 'Horror', 'Satire', etc" onChange={handleInputChange}></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="storyChannel" className="form-label label-style">Story channel</label>
                                <textarea value={storyChannel} name="storyChannel" className="form-control input-style form-input-style" id="storyChannel" placeholder="Story channel, like 'Book', 'Film', 'Video game', etc" onChange={handleInputChange}></textarea>
                            </div>
                        </div>

                        <div className="col-12">
                            <button className="btn btn-style" type="submit">
                                Add story
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