//import the model
const e = require("express");
const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();


//SignUp
exports.userSignUp = async (req, res) => {
    try {

        //get all data 
        const { name, email, gender, password } = req.body;

        //checking validation from server side!!
        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if (!name) {
            return res.status(400).json({
                message: "Please provide name",
                error: true,
                success: false
            })
        }

        if (!password) {
            return res.status(400).json({
                message: "Please provide passoword",
                error: true,
                success: false
            })
        }
        if (!gender) {
            return res.status(400).json({
                message: "Please provide Gender",
                error: true,
                success: false
            })
        }

        // finding user from database
        const isuserexist = await userModel.findOne({ email })
        if (isuserexist) {
            return res.status(400).json({
                message: "User already exits",
                error: true,
                success: false
            })
        }

        //convert password into hash(To secure password)
        let hashedPassword;
        try {
            hashedPassword = await bcryptjs.hash(password, 10);
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error inn hashing Password',
            })
        }

        //create entry for User to database
        const user = await userModel.create({
            name, email, gender, password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: 'User Created Successfully',
        })
    }
    catch (error) {
        res.status(500).json({
            message: "User can't be register Please try again later",
            error: true,
            success: false
        })
    }
}


//login
exports.userlogin = async (req, res) => {
    try {
        //data fetch
        const { email, password } = req.body;

        //validation on email and password 
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            })
        }

        //check for registered user
        let user = await userModel.findOne({ email });
        //if not a register user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        //make a payload
        const payload = {
            email: user.email,
            id: user._id,
            name: user.name
        }

        //verify password and generate a JWT token
        if (await bcryptjs.compare(password, user.password)) {
            //password mathced then move to create token
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
            //pass the token to user-object by creating a another field in user
            user = user.toObject(); //convert to object
            user.token = token;
            //remove password from the user-object (To prevent hacked)
            user.password = undefined;


            //making a options, cookies will exprie after 25 days
            const options = {
                expires: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
                httpOnly: true,   //can't access the cookies in client side
            }
            //name, value, options(features of cookie)
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,name:user.name, user,id:user._id, message: 'Logged in successfully'
            })

        }
        else {
            //password do not match 
            return res.status(403).json({
                success: false,
                message: "Invalid Credentials",
            })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login Failure',
            error: true
        })
    }
}

//Delete all user
exports.deleteAllUser = async (req, res) => {
    try {
        await userModel.deleteMany().then(res.status(200).json({ message: 'All users deleted successfully' }));

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to Delete",
            error: true
        })
    }
}


//add wishlist
exports.addwishlist = async (req, res) => {
    const userId = req.params.userId;
    const { wishlistItem } = req.body;
    try {
        let user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productIndex = user.wishlist.indexOf(wishlistItem);

        if (productIndex !== -1) {
            // Product already exists in wishlist, remove it
            user.wishlist.splice(productIndex, 1);
            await user.save();
            return res.status(200).json({ message: 'Product removed from the wishlist' });
        } else {
            // Product doesn't exist in wishlist, add it
            user.wishlist.push(wishlistItem);
            await user.save();
            return res.status(200).json({ message: 'Product added to Wishlist' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to add/remove wishlist item",
            error: true
        });
    }
};


//getUserById 
exports.getUserById = async (req, res) => {
    const userId = req.params.userId;
    try {
        let user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else{
            return res.status(200).json(user);
        }

    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to fetch use Details",
            error: true
        });
    }
}



