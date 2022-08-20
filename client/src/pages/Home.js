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
      <div className="row">
        <div className="col-12">
          {loading ? (
            <p>Loading stories...</p>
          ) : ( 
            <StoryList
              stories={stories}
              showButton={false}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
