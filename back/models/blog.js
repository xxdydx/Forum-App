const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  dateCreated: Date,
  likes: Number,
  comments: [commentSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
