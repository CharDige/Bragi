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
            <h3>
                Stories published
            </h3>
            {stories &&
                stories.map((story) => (
                    <div key={story._id} className="card mb-3">
                        <h4 className="card-header p-2 m-0">
                            <Link
                                to={`/stories/${story._id}`}
                            >
                                {story.storyTitle}
                            </Link>
                            {showUsername ? (
                                <span>{' '}by <Link to={`/profiles/${story.storyAuthor}`}>
                                    {story.storyAuthor}
                                </Link></span>
                            ) : (
                                <span></span>
                            )}
                        </h4>
                        <div className="card-body p-2">
                            <p>
                                {story.storyDescription}
                            </p>
                        </div>
                        <Link
                            className="btn"
                            to={`/stories/${story._id}`}
                        >
                            Read more
                        </Link>
                        <button className='btn' onClick={() => handleDeleteStory(story._id)}>
                            Remove story
                        </button>
                    </div>
                ))}
        </div>
    );
};

export default StoryList;