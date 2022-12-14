import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';

import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
        return (
            <p className='loading-text'>
                Loading...
            </p>
        )
    }

    if (!user?.username) {
        return (
            <p>
                Whoops! You need to be logged in to see a profile.
            </p>
        );
    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <div>
                    <div className="row justify-center mb-3">
                        <div className='col-12 col-lg-3'>
                            <h2>
                                {userParam ? `${user.username}` : 'Your profile'}
                            </h2>

                            <h3>
                                Preferred channel
                            </h3>
                            <p className='profile-details'>
                                {user.channel}
                            </p>

                            <h3>
                                Preferred genre
                            </h3>
                            <p className='profile-details'>
                                {user.genre}
                            </p>

                            <h3>Contact me to collaborate!</h3>
                            <a href={`mailto:${user.email}`} className="profile-email-link">
                                {user.email}
                            </a>
                        </div>

                        <div className='col-12 col-lg-9'>
                            <h2>
                                Stories published
                            </h2>

                            <div>
                                <StoryList
                                    stories={user.stories}
                                    showUsername={false}
                                    showButton={!userParam}
                                />
                            </div>

                            {!userParam && (
                                <div className="col-12 col-lg-10 mb-3 p-3">
                                    <StoryForm />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className='error-message'>
                    Whoops! You need to be logged in to look at profiles. Please{' '}
                    <Link to="/login" className='login-signup-link'>login</Link> or <Link to="/signup" className='login-signup-link'>signup.</Link>
                </p>
            )
            }
        </main >
    );
};

export default Profile