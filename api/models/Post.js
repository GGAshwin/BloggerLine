const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const reviewSchema = new mongoose.Schema({
  // Add review specific properties here
  userId: {
    type: String,
    ref: "User", // Reference the User model (assuming you have one)
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  averageRating: {
    type: Number,
    required: false,
  },
});

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: {
      type: [commentSchema],
      required: false, // Adjust as needed (optional comments)
    },
    reviews: {
      type: [reviewSchema], // Can hold ratingSchema or reviewSchema objects
      required: false, // Adjust as needed (optional reviews)
    },
    approved:{
      type: Boolean,
      required: true,
      default: false

    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
