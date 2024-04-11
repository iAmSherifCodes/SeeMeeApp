import mongoose from "mongoose";

const Post = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    description: {
        type :String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    video: {
        type: String,
        required: false
    },
    likes: [{
        username: {
            type: String,
        },
        _id: false
    }],
    comments: [
        {
            comment: {
                type: String,
            },
            author: {
                type: String,
            },
            _id: false
        }
    ]
},
{
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
});

export default mongoose.model("Post", Post);
