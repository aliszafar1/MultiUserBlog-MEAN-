var postModel = require('./postModel');
var jwt = require('jsonwebtoken');
process.env.SECRET_KEY = 'mykey';

function getPosts(req, res){
    postModel.PostsSchema.find(function(err, data){
                if(err) throw err;
                res.json(data);
                })   
    }

function getPostById(req, res){
    var id = req.params.id;
    postModel.PostsSchema.find({_id: id}, function(err, data){
        if(err) throw err;
        res.json(data);
    })
}

function getPostByCategory(req, res){
    var category = req.params.category;
    postModel.PostsSchema.find({category: category}, function(err, data){
        if(err) throw err;
        res.json(data);
    })
}

function addPost(req, res){
    var newPost = new postModel.PostsSchema({
        title: req.body.title,
        category: req.body.category,
        author: req.body.author,
        body: req.body.body,
        url: req.body.url,
        authorIMG: req.body.authorIMG,
        date: new Date()
    });
    newPost.save(function(err, data){
        if(err) throw err;
        console.log('###### Post Saved ######3');
    })
    console.log('###### Post Data #######', newPost);
    res.send('Post Added');
}

function addComment(req, res){
    var id = req.params.id;
    var update = { msg: req.body.comment }
    postModel.PostsSchema.findByIdAndUpdate(id, {$push: {"comment":{msg: req.body.comment}}}, function(err, data){
        if(err) throw err;
        console.log('##### Data ###### update');
    })
    console.log('###### comment id ######', id);
    res.send("Comment Added");

    
}

function deleteComment(req, res){
    console.log('###### deleteComment #######', req.params.id);
    var id = req.params.id;
    var cID = req.params.cID;
        postModel.PostsSchema.update({_id: id}, { $pull :{
            "comment": {_id: cID}
        }}
        // , false, true
        , function(err, data){
            if(err) throw err;
            console.log(' ##### Comment Delete #$$$$$$#');
            res.send('Comment Deleted');            
        }
        );

}

function replyComment(req, res){
    var id = req.params.id;
    var cID = req.params.cID;
    var repl = req.body.reply;
    console.log(id);
    console.log(req.body.reply);
    postModel.PostsSchema.update({_id: id, "comment._id": cID}, {$push: {
        "comment.$.reply": {
            msg: repl
        }
    }}, function(err, data){
        if(err) throw err;
        console.log('@###### Reply ##### ;)');
        res.send('Reply Added');
    })
}

function editComment(req, res){
    var postID = req.params.postID;
    var commentID = req.params.commentID;
    // console.log("##### Edit Comment #??????", req.body.msg);
    // console.log('####### commetID ########', commentID);
    // postModel.PostsSchema.update({"reply._id": commentID},
    //      { "$set": { "reply.$.msg": req.body.msg }},
    //      function(err, data){
    //     if(err) throw err;
    //     console.log('########## Comment Edited #######3');
    //     res.send("Your comment is Added");
    // });
}
exports.getPosts = getPosts;
exports.getPostById = getPostById;
exports.getPostByCategory = getPostByCategory;
exports.addPost = addPost;
exports.addComment = addComment;
exports.deleteComment = deleteComment;
exports.replyComment = replyComment;
exports.editComment = editComment;
