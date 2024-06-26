const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
// use async function if operations with database is involved
router.put("/:id", async (req, res) => {
  // console.log(req.body);
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        console.log("done");
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // to exclude the password from the response
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (e) {
    console.log(e);
    res.status(404).json("USER NOT FOUND");
  }
});

// do not push
router.delete("/", async (req, res) => {
  try {
    const user = await User.deleteMany({});
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
