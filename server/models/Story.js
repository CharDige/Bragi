const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const storySchema = new Schema({
    storyTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
        trim: true,
    },
    storyDescription: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 500,
        trim: true,
    },
    storyContent: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
    },
    storyAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    storyGenre: {
        type: String,
        required: true,
    },
    storyChannel: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
            },
            commentAuthor: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => dateFormat(timestamp),
            },
        },
    ],
});

const Story = model('Story', storySchema);

module.exports = Story;