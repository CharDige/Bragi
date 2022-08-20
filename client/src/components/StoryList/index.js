import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

// Import Auth
import Auth from '../../utils/auth';

// Add mutations
import { REMOVE_STORY } from '../../utils/mutations';

const StoryList = ({
    stories,
    showUsername = true,
    showButton
}) => {
    const [removeStory] = useMutation(REMOVE_STORY)

    const handleDeleteStory = async (storyId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const { data } = await removeStory({
                variables: { storyId }
            });
            window.location.reload();
        } catch (error) {
            console.log(error)
        };
    }

    if (!stories.length) {
        return <p>No stories yet!</p>
    }

    return (
        <div>
            <div className='row'>
                {stories &&
                    stories.map((story) => (
                        <div key={story._id} className="col-12 col-lg-6">
                            <div className="card-styling">
                                <div className="story-card-header">
                                    <h3 className='h3-extra-colour'>
                                        <Link
                                            to={`/stories/${story._id}`}
                                            className="story-title-style"
                                        >
                                            {story.storyTitle}
                                        </Link>
                                        {showUsername ? (
                                            <span>{' '}by <Link to={`/profiles/${story.storyAuthor}`} className="story-title-style">
                                                {story.storyAuthor}
                                            </Link>
                                            </span>
                                        ) : (
                                            <span></span>
                                        )}
                                    </h3>
                                    <p className='created-date'>{' '}created on {story.createdAt}</p>
                                </div>

                                <div className="story-card-body">
                                    <p>
                                        {story.storyDescription}
                                    </p>
                                </div>
                                <Link
                                    className="btn btn-style"
                                    to={`/stories/${story._id}`}
                                >
                                    Read more
                                </Link>
                                {showButton ? (
                                    <button className='btn btn-style' onClick={() => handleDeleteStory(story._id)}>
                                        Remove story
                                    </button>
                                ) : (
                                    <span></span>
                                )}
                            </div>

                        </div>
                    ))}
            </div>
        </div>
    );
};

export default StoryList;