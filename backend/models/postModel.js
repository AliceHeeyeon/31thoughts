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
        text: {
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
    },
    {timestamps: true}
);

module.exports = mongoose.model("Post", postSchema);