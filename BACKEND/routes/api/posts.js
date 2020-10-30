const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatePostInput = require('../../validation/post');

// Load model
const Post = require('../../models/Post');

// @route   GET api/posts
// @desc    Get post
// @access  Public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID' }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const { text, name, avatar } = req.body;

    // Create Post
    const newPost = new Post({
        text,
        name,
        avatar,
        user: req.user.id
    });

    // save
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(500).json(err));
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            // Check for post owner
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized'});
            }
            
            // Delete post
            post.remove()
                .then(post => res.json({ success:true }))
                .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
        });
    }).catch((err) => res.status(400).json({ noprofile: 'There is not profile for this user' }));
});

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(
                like => like.user.toString() == req.user.id 
            ).length > 0) {
                return res.status(400).json({ alreadyliked: 'User already likes this post' });
            }

            // like
            post.likes.unshift({ user: req.user.id });

            //save
            post.save().then(post => res.json(post));
        });
    }).catch((err) => res.status(400).json({ noprofile: 'There is not profile for this user' }));
});

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(
                like => like.user.toString() == req.user.id 
            ).length === 0) {
                return res
                    .status(400)
                    .json({ notliked: 'You have not yet liked' });
            }

            // Remove Index
            const removeIndex = post.likes
                .map(item => item.user.toString())                        
                .indexOf(req.user.id);

            // Splice out of array
            post.likes.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
        });
    }).catch((err) => res.status(400).json({ noprofile: 'There is not profile for this user' }));
});

// @route   POST api/posts/comment/:id
// @desc    Comment post
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check validation
    if(!isValid) {
        // If any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const { text, name, avatar } = req.body;

            // Create comment
            const newComment = {
                text,
                name,
                avatar,
                user: req.user.id
            };

            // Add comments to array
            post.comments.unshift(newComment);

            // Save
            post.save().then(post => res.json(post))
                    .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(404).json({ nopostfound: 'No Post found for that ID' }));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            // Check comment
            if(post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
            ).length === 0) {
                return res.status(404).json({ commentnotexists: 'Comment does not exist' });
            }

            // Remove Index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            // Splice out of an array
            post.comments.splice(removeIndex, 1);

            // Save
            post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: 'No Post found for that ID' }));
});

module.exports = router;