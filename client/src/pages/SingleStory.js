import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/singlestory.css';

// Import useParams()
import { useParams } from 'react-router-dom';

// Import components
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';

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
        <main>
            <div className="single-story-style">
                <div className="single-story-card-header">
                    <h2 className='single-story-title-style'>
                        {story.storyTitle} by <Link to={`/profiles/${story.storyAuthor}`} className="profile-link">{story.storyAuthor}</Link>
                    </h2>
                    <p className='single-story-created-at'>Published on {story.createdAt}</p>
                </div>
                <div className='single-story-card-body'>
                    <p className="single-story-content">
                        {story.storyContent}
                    </p>
                </div>

                <div className='col-12 col-lg-10 mb-5'>
                    <CommentList />
                </div>

                <div className='col-12 col-lg-10 mb-3 p-3'>
                    <CommentForm />
                </div>
            </div>
        </main>
    );
};

export default SingleStory;