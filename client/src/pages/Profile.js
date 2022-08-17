import { useQuery } from '@apollo/client';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import StoryForm from '../components/StoryForm';
import StoryList from '../components/StoryList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {
    const { username: userParam } = useParams();
    const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
        return (
            <>
                Loading...
            </>
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
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-lg-10">
                    {userParam ? `${user.username}` : 'You'}
                </h2>

                <div className="col-12 col-lg-10 mb-5">
                    <StoryList
                        stories={user.stories}
                    />
                </div>

                {!userParam && (
                    <div className="col-12 col-lg-10 mb-3 p-3">
                        <StoryForm />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile