import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      channel
      genre
      stories {
        _id
        storyTitle
        storyDescription
        storyGenre
        storyChannel
        createdAt
      }
    }
  }
`;

export const QUERY_STORIES = gql`
  query getStories {
    stories {
      _id
      storyTitle
      storyDescription
      storyAuthor
      storyGenre
      storyChannel
      createdAt
    }
  }
`;

export const QUERY_SINGLE_STORY = gql`
  query getSingleStory($storyId: ID!) {
    story(storyId: $storyId) {
      _id
      storyTitle
      storyDescription
      storyContent
      storyAuthor
      storyGenre
      storyChannel
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME= gql`
query Me {
  me {
    _id
    username
    email
    channel
    genre
    stories {
      _id
      storyTitle
      storyDescription
      storyGenre
      storyChannel
      createdAt
    }
  }
}
`;