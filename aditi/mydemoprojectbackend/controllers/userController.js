const User = require("../models/usersModel");
const Product = require("../Models/productModel");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

// get all users
exports.getUsers = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};


// get user by id
exports.getUserById = (req, res) => {
  const id = req.params.id;
  if (id != null) {
    User.findById(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } else {
    res.status(401).send(`User with id ${id} does not exist`);
  }
};



//user signUp
exports.userSignUp = async (req, res) => {
  try {
    //checking validation from server side
    if (!req.body.email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }

    if (!req.body.username) {
      return res.status(400).json({
        message: "Please provide username",
        error: true,
        success: false,
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        message: "Please provide passoword",
        error: true,
        success: false,
      });
    }

    // finding user from database
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: "Already user exits",
        error: true,
        success: false,
      });
    }

    //convert password into hash
    bcryptjs.genSalt(10, function (err, salt) {
      bcryptjs.hash(req.body.password, salt, async function (err, hash) {
        // Store hash in password DB.
        if (err) {
          return res.status(400).json({
            message: err,
            error: true,
            success: false,
          });
        }
        console.log("hash", hash);

        const payload = {
          ...req.body,
          password: hash,
        };

        const userDetails = new User(payload);
        const save = await userDetails.save();

        return res.status(200).json({
          message: "User Created successfully",
          data: save,
          error: false,
          success: true,
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      error: true,
      success: false,
    });
  }
};


//user signin
exports.userSignin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // checking validation from server
    if (!email) {
      return res.status(400).json({
        message: "Please provide email",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "Please provide password",
        error: true,
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not available",
        error: true,
        success: false,
      });
    }

    // Compare password hashes
    bcryptjs.compare(password, user.password, function (err, passwordMatch) {
      //passwordMatch is true
      if (err) {
        return res.status(400).json({
          message: "Check your password",
          error: true,
          success: false,
        });
      }

      if (!passwordMatch) {
        return res.status(400).json({
          message: "Incorrect password",
          error: true,
          success: false,
        });
      }

      const payload = {
        _id: user._id,
        email: user.email
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200).json({
        token: token,
        error: false,
        success: true,
        id:user._id,
        name:user.username,
        message: "Login successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
};


exports.wishlist = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  try {
    const user = await User.findById(id);
    const product = await Product.findById(_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
      const index = user.wishlist.indexOf(_id);
      if (index > -1) {
        // If the product is already in the wishlist, remove it first
        user.wishlist.splice(index, 1);
        await user.save();
        return res.status(201).json({ message: 'Product removed from wishlist successfully' });
      }else {
      user.wishlist.push(_id);
      await user.save();
      return res.status(201).json({ message: 'Product added to wishlist successfully' });
    }
  } catch (err) {
    console.error('Error updating wishlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getWishlistById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId, 'wishlist');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const wishlistWithDetails = await Promise.all(
      user.wishlist.map(async productId => {
        try {
          const product = await Product.findById(productId);
          return product;
        } catch (err) {
          console.error('Error fetching product:', err);
          return null;
        }
      })
    );

    const filteredWishlist = wishlistWithDetails.filter(product => product !== null);

    res.status(200).json({ wishlist: filteredWishlist });
  } catch (err) {
    console.error('Error fetching wishlist:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

