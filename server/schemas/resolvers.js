const { AuthenticationError } = require('apollo-server-express');
const { User, Story } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('stories');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('stories');
    },
    stories: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Story.find(params).sort({ createdAt: -1 });
    },
    story: async (parent, { storyId }) => {
      return Story.findOne({ _id: storyId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ email: context.user.email}).populate('stories');
      }
      throw new AuthenticationError('You must be signed in');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, channel, genre }) => {
      const user = await User.create({ username, email, password, channel, genre });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
