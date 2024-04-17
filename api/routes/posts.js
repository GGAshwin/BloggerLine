const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

async function callToNotification(){
  const response = await fetch("http://localhost:3001/api/notification");
  const data = await response.json();
  fetch("http://localhost:3001/api/notification/send")
  console.log(data);
}

// Create
// use async function if operations with database is involved
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    callToNotification();
    console.log("logging");
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json("YOU CAN UPDATE ONLY YOUR POST");
      }
    } else {
      res.status(401).json("YOU CAN UPDATE ONLY YOUR POST");
    }
  } catch (err) {
    res.status(401).json("YOU CAN UPDATE ONLY YOUR POST");
    console.log(err);
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (e) {
    console.log(e);
    res.status(404).json("USER NOT FOUND");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("POST DELETED");
      } catch (error) {
        console.log(error);
        res.status(500).json("YOU CAN DELETE ONLY YOUR POST");
      }
    } else {
      res.status(401).json("YOU CAN DELETE ONLY YOUR POST");
    }
  } catch (err) {
    console.log(err);
    res.status(401).json("YOU CAN DELETE ONLY YOUR POST");
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const userName = req.query.username;
  const catName = req.query.cat;
  try {
    let posts;
    if (userName) {
      posts = await Post.find({ username: userName }).sort({ date: -1 });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

// Post Comment

// Endpoint to create a comment
router.post("/:postId/comments", async (req, res) => {
  try {
    // Extract post id and comment data from request
    const { postId } = req.params;
    const { content, author } = req.body;

    // Validate required fields (adjust as needed)
    if (!content || !author) {
      return res
        .status(400)
        .json({ message: "Content and author are required" });
    }

    // Find the post by its id
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new comment object
    const newComment = {
      content,
      author,
    };

    // Push the new comment to the post's comments array
    post.comments.push(newComment);

    // Save the updated post with the new comment
    await post.save();

    // Respond with success message and potentially the updated post
    res.status(201).json({ message: "Comment created successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/*Routed for Reviews*/
// Helper function to calculate average rating
function calculateAverageRating(post) {
  if (!post.reviews.length) return 0;

  const totalRating = post.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  return totalRating / post.reviews.length;
}

// POST Review
router.post("/:postId/reviews", async (req, res) => {
  try {
    // Extract post id and review data from request
    const { postId } = req.params;
    const { userId, rating } = req.body;

    // Validate required fields and rating range
    if (!userId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Check if user already reviewed this post
    const existingReview = await Post.findOne({
      _id: postId,
      reviews: { $elemMatch: { userId } },
    });

    if (existingReview) {
      return res
        .status(403)
        .json({ message: "You can only review a post once" });
    }

    // Find the post by its id
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create a new review object
    const newReview = {
      userId,
      rating,
    };

    // Push the new review to the post's reviews array
    post.reviews.push(newReview);

    // Save the updated post with the new review and average rating
    await post.save();

    // Respond with success message and potentially the updated post
    res.status(201).json({ message: "Review added successfully", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET Reviews
router.get("/:postId/reviews", async (req, res) => {
  try {
    const { postId } = req.params;

    // Find the post by its id and populate reviews with user information (optional)
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.averageRating = calculateAverageRating(post);

    res
      .status(200)
      .json({ reviews: post.reviews, averageRating: post.averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
