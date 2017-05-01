var mongoose = require('mongoose');
// Posts Schema
var PostsSchema = new mongoose.Schema({
    title:{ type: String },
    category:{ type: String },
    author:{ type: String },
    body:{ type: String },
    date:{ type: Date },
    comment: [{ 
                msg: {type: String},
                reply: [{
                            msg: {type: String}
                        }]
                }],
    url: { type: String },
    authorIMG: { type: String }
});

var PostsSchema = mongoose.model("posts", PostsSchema);
exports.PostsSchema = PostsSchema;