
const Bookmark=require("../Models/BookmarkModel");

exports.createBookmark = async (req, res) => {
    const userId = req.params.userId;
    const pId = req.body.product;
 
    try {
     
        let currentUser = await Bookmark.findOne({ userId });
 
        if (!currentUser) {
           
            currentUser = new Bookmark({ userId });
        }
 
        
        const alreadyAdded = currentUser.product.includes(pId);
 
        if (alreadyAdded) {
            
            currentUser.product.pull(pId);
        } else {
           
            currentUser.product.push(pId);
        }
 
        
        await currentUser.save();
 
        res.json(currentUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


//Get all bookmarks by userID
exports.getwishlistItems = async (req, res) => {
  const userId=req.params.userId
    try {
      
      const bookmarks = await Bookmark.find({userId});
      
      res.status(200).json(bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


