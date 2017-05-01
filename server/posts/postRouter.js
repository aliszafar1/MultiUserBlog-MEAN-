var express = require('express');
var postController = require('./postController');
var router = express.Router();

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.get('/:category', postController.getPostByCategory);
router.post('/', postController.addPost);
router.put('/comment/:id', postController.addComment);
router.put('/:id/:cID', postController.deleteComment);
router.put('/replyComment/:id/:cID', postController.replyComment)
router.put('/editComment/:postID/:commentID', postController.editComment);

module.exports = router;