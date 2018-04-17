const express = require("express");
const router = express.Router();
const passport = require("passport");

const postsController = require("../controllers/posts");
const postsValidator = require("../middlewares/postsValidator");

// @route GET api/posts
// @desc  Fetch all posts
// @access Public

router.get("/", postsController.fetchPosts);

// @route GET api/posts/post_id
// @desc  Fetch post with id
// @access Public

router.get("/:post_id", postsController.fetchPostWithId);

// @route POST api/posts
// @desc  Create/update post
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postsValidator,
  postsController.createNewPost
);

// @route POST api/posts/:post_id/likes
// @desc  Like post
// @access Private

router.post(
  "/:post_id/likes",
  passport.authenticate("jwt", { session: false }),
  postsController.likePost
);

// @route POST api/posts/:post_id/unlikes
// @desc  Unlike post
// @access Private

router.delete(
  "/:post_id/likes",
  passport.authenticate("jwt", { session: false }),
  postsController.unlikePost
);

// @route POST api/posts/:post_id/likes
// @desc  Like post
// @access Private

router.post(
  "/:post_id/comments",
  passport.authenticate("jwt", { session: false }),
  postsValidator,
  postsController.addComment
);

// @route POST api/posts/:post_id/unlikes
// @desc  Unlike post
// @access Private

router.delete(
  "/:post_id/comments/:comment_id",
  passport.authenticate("jwt", { session: false }),
  postsController.removeComment
);

// @route DELETE api/posts/:post_id
// @desc  Delete post
// @access Private

router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  postsController.deletePostWithId
);

module.exports = router;
