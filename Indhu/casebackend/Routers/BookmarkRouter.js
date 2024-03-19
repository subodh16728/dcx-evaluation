const express = require('express');
const BookmarkRouter = express.Router();
const BookmarkController=require("../Controller/BookMarkController")

 
// Create a new bookmark
BookmarkRouter.put("/add/:userId",BookmarkController.createBookmark);
BookmarkRouter.get("/:userId",BookmarkController.getwishlistItems);

 

 
module.exports = BookmarkRouter;