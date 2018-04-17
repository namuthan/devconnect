const mongoose = require("mongoose");
const Post = require("../models/Post");
const Profile = require("../models/Profile");

exports.createNewPost = (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.status(500).json(err));
};

exports.fetchPosts = (req, res) => {
  Post.find()
    .populate("user", ["name", "avatar"])
    .sort({ date: -1 })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(500).json({ nopostsfound: " No posts found" }));
};

exports.fetchPostWithId = (req, res) => {
  Post.findById(req.params.post_id)
    .populate("user", ["name", "avatar"])
    .populate("likes.user", ["name", "avatar"])
    .populate("comments.user", ["name", "avatar"])
    .then(post => {
      res.json(post);
    })
    .catch(err =>
      res.status(404).json({ nopostfound: " No post found with that Id" })
    );
};

exports.deletePostWithId = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized: "User not authorized"
        });
      }

      return post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};

exports.likePost = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      const arr = post.likes.filter(
        like => like.user.toString() === req.user.id
      );

      if (arr.length > 0) {
        return res
          .status(400)
          .json({ alreadyliked: "User already liked this post" });
      }

      // Add the user id
      post.likes.unshift({ user: req.user.id });

      return post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};

exports.unlikePost = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      const arr = post.likes.filter(
        like => like.user.toString() === req.user.id
      );

      if (arr.length === 0) {
        return res
          .status(400)
          .json({ notliked: "You have not yet liked this post" });
      }

      // Remove the user id
      const removeIndex = post.likes
        .map(item => item.user.toString())
        .indexOf(req.user.id);

      if (removeIndex >= 0) {
        post.likes.splice(removeIndex, 1);
      }
      return post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};

exports.addComment = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      return post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({ postnotfound: "No post found" }));
};

exports.removeComment = (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      const arr = post.comments.filter(
        c => c._id.toString() === req.params.comment_id
      );
      if (arr.length === 0) {
        return res
          .status(404)
          .json({ commentnotexisits: "comment does not exist" });
      }

      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      if (removeIndex >= 0) {
        post.comments.splice(removeIndex, 1);
      }
      return post.save().then(post => res.json(post));
    })
    .catch(err => {
      res.status(404).json({ postnotfound: "No post found" });
    });
};
