import mongoose from "mongoose";

const User = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        index: true
    },
    password:{
        type: String,
        required: true
    },
    salt:{
      type: String,
      required: true
  },
    followers: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
              },
            username: {
                type: String,
                lowercase: true,
                unique: true,
                index: true
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
}
); 

export default mongoose.model("User", User);