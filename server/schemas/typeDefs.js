const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    channel: String
    genre: String
    stories: [Story]!
  }

  type Story {
    _id: ID
    storyTitle: String
    storyDescription: String
    storyContent: String
    storyAuthor: String
    storyGenre: String
    storyChannel: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    stories(username: String): [Story]
    story(storyId: ID!): Story
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, channel: String!, genre: String!): Auth
    login(email: String!, password: String!): Auth
    addStory(storyTitle: String!, storyDescription: String!, storyContent: String!, storyGenre: String!, storyChannel: String!): Story
  }
`;

module.exports = typeDefs;
