import React from 'react';
import { useQuery } from '@apollo/client';

// Import StoryList component
import StoryList from '../components/StoryList';

// Import queries
import { QUERY_STORIES } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_STORIES);
  const stories = data?.stories || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-lg-10 mb-3 p-3">
          {loading ? (
            <p>Loading stories...</p>
          ) : (
            <StoryList
              stories={stories}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
