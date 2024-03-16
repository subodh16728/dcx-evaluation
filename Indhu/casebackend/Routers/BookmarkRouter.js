const express = require('express');
const BookmarkRouter = express.Router();
// const Bookmark=require('../Models/BookmarkModel');
const BookmarkController=require("../Controller/BookMarkController")

 
// Create a new bookmark

BookmarkRouter.post("/add/:userId",BookmarkController.createBookmark);
BookmarkRouter.delete("/delete/:userId",BookmarkController.deleteBookmark);
BookmarkRouter.get("/:userId",BookmarkController.getwishlistItems);

 
 
// Delete a bookmark
// BookmarkRouter.delete('/:id', deleteBookmark);
 
module.exports = BookmarkRouter;