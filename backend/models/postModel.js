const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        subject: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        linkedin: {
            type: String
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likes: {
            type: Number,
            default: 0
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);