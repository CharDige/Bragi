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

// Import Auth
import Auth from '../utils/auth';

const SingleStory = () => {
    const { storyId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_STORY, {
        variables: { storyId: storyId },
    });

    const story = data?.story || {};

    if (loading) {
        <p className='loading-text'>
            Loading...
        </p>
    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <div className="single-story-style">
                    <div className="single-story-card-header">
                        <h2 className='single-story-title-style'>
                            {story.storyTitle} by <Link to={`/profiles/${story.storyAuthor}`} className="profile-link">{story.storyAuthor}</Link>
                        </h2>
                        <p className='single-story-created-at'>Published on {story.createdAt}</p>
                        <p className='single-story-created-at'>Channel: <span className='story-details'>{story.storyChannel}</span> | Genre: <span className='story-details'>{story.storyGenre}</span></p>
                    </div>
                    <div className='single-story-card-body'>
                        <p className="single-story-content">
                            {story.storyContent}
                        </p>
                    </div>

                    <div className='col-12'>
                        <CommentList 
                        comments={story.comments}
                        storyId={story._id}
                        />
                    </div>

                    <div className='col-12'>
                        <CommentForm storyId={story._id}/>
                    </div>
                </div>
            ) : (
                <p className='error-message'>
                    Whoops! You need to be logged in to look at stories. Please{' '}
                    <Link to="/login" className='login-signup-link'>login</Link> or <Link to="/signup" className='login-signup-link'>signup.</Link>
                </p>
            )}

        </main>
    );
};

export default SingleStory;