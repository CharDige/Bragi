import React from 'react';

// Import useParams()
import { useParams } from 'react-router-dom';

// Import components
import CommentForm from '../components/CommentForm';

// Import useQuery()
import { useQuery } from '@apollo/client';

// Import queries
import { QUERY_SINGLE_STORY } from '../utils/queries';

const SingleStory = () => {
    const { storyId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
        variables: { storyId: storyId },
    });

    const story = data?.story || {};

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="my-3">
            <div className="card-header p-2 m-0">
                <h2>
                    {story.storyTitle} by {story.storyAuthor}
                </h2>
                <p>Published on {story.createdAt}</p>
            </div>
            <div className='card-body'>
                <p>
                    {story.storyContent}
                </p>
            </div>

            <div className='col-12 col-lg-10 mb-3 p-3'>
                <CommentForm />
            </div>
        </div>
    );
};

export default SingleStory;