import React from 'react';
import { Link } from 'react-router-dom';

const StoryList = ({
    stories
}) => {
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
                    </div>
                ))}
        </div>
    );
};

export default StoryList;