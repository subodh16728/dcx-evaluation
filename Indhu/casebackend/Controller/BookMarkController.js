
const Bookmark=require("../Models/BookmarkModel");


// Create bookmark
exports.createBookmark = async (req, res) => {
    const userId = req.params.userId;

    const productId = req.body.product;
    // console.log(userId,productId)

    try {
        if (!userId || !productId) {
            return res.status(400).json({
                error: "Provide userId and productId"
            });
        }

        let bookmark = await Bookmark.findOne({ userId });

        if (!bookmark) {
            bookmark = new Bookmark({ userId, product: [] });
        }

        // Check if product already exists in 
        if (bookmark.product.includes(productId)) {
            return res.status(400).json({ error: "Product already in wishlist" });
        }

        // Add the new product to the bookmark list
        bookmark.product.push(productId);
        await bookmark.save();

        res.status(201).json({ message: 'Bookmark created successfully' });
    } catch (error) {
        console.error('Error creating bookmark:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//Get all bookmarks by userID
exports.getwishlistItems = async (req, res) => {
  const userId=req.params.userId
    try {
      // Find all bookmarks 
      const bookmarks = await Bookmark.find({userId});
      
      res.status(200).json(bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.deleteBookmark = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.product;

  console.log(userId,productId);

  try {
      // Validate input
      if (!userId || !productId) {
          return res.status(400).json({ error: 'Please provide userId and productId.' });
      }

      // Find the user's wishlist
      const wishlist = await Bookmark.findOne({ userId });
      if (!wishlist) {
          return res.status(404).json({ error: 'Wishlist not found' });
      }

      // Check if product exists in wishlist
      const index = wishlist.product.indexOf(productId);
      if (index === -1) {
          return res.status(400).json({ error: 'Product not found in wishlist' });
      }

      // Remove product from wishlist
      wishlist.product.splice(index, 1);
      await wishlist.save();

      res.json({ message: 'Product removed from wishlist successfully' });
  } catch (error) {
      console.error('Error removing product from wishlist:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

