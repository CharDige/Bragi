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
        throw new AuthenticationError('Whoops! Either your email or your password is incorrect.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Whoops! Either your email or your password is incorrect.');
      }

      const token = signToken(user);

      return { token, user };
    },
    addStory: async (parent, { storyTitle, storyDescription, storyContent, storyGenre, storyChannel }, context) => {
      if (context.user) {
        const story = await Story.create({
          storyTitle,
          storyDescription,
          storyContent,
          storyGenre,
          storyChannel,
          storyAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { stories: story._id } }
        );

        return story;
      }
      throw new AuthenticationError("Whoops! Looks like you can't post your story. Check that you're logged in and try again.");
    },
    addComment: async (parent, { storyId, commentText }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("Whoops! Looks like you can't post your comment. Check that you're logged in and try again.");
    },
    removeStory: async (parent, { storyId }, context) => {
      if (context.user) {
        const story = await Story.findOneAndDelete({
          _id: storyId,
          storyAuthor: context.user.username,
        });
  
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { stories: story._id } }
        );
  
        return story
      }
      throw new AuthenticationError("Whoops! Looks like you can't delete your story. Check that you're logged in and try again.");
    },
    removeComment: async (parent, { storyId, commentId }, context) => {
      if (context.user) {
        return Story.findOneAndUpdate(
          { _id: storyId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("Whoops! Looks like you can't delete your comment. Check that you're logged in and try again.");
    }
  },
};

module.exports = resolvers;
