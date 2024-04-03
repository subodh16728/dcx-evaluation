
const jwt = require('jsonwebtoken');
const Registeruser = require('../models/userModel');


const Register = async (req, res) => {
    try {
        const { username, email, password, confirmpassword } = req.body;


        if (!email) {
            return res.status(400).json({
                message: "Please provide email",
                error: true,
                success: false
            })
        }

        if (!username) {
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
        let exist = await Registeruser.findOne({ email: email })
        if (exist) {
            return res.status(400).json({
                message: "User already exists",
                error: true,
                success: false
            });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                error: true,
                success: false
            });
        }
        
        
        let newUser = new Registeruser({
            username,
            email,
            password,
            confirmpassword
        })
        await newUser.save();
        console.log(newUser);
        res.status(200).send('registered successfully')


    } catch (err) {
        console.log(err)
        return res.status(500).send('internal server error')
    }
}
const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        let exist = await Registeruser.findOne({ email });
        
        if (!exist) {
            return res.status(400).send('user not found');
        }
        if (exist.password !== password) {
            return res.status(400).send("Invalid credentials");
        }
        let payload = {
            user: {
                id: exist.id
            }
        }
        jwt.sign(payload, 'jwtSecret', { expiresIn: 3500000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token })
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
}

const Dashboard = async (req, res) => {
    try {
        let exist = await Registeruser.findById(req.user.id);
        if (!exist) {
            return res.status(400).send('user not found');
        }
        res.json(exist);
    } catch (err) {
        console.log(err);
        return res.status(500).send('server error')
    }
}

const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await Registeruser.find();

        // Return the array of users
        res.json(users);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;

        // Find the user by ID
        let user = await Registeruser.findById(userId);

        // Update user data
        if (user) {
            // Prevent updating the email
            if (email && email !== user.email) {
                return res.status(400).json({ message: 'Email cannot be changed' });
            }
            
            user.username = username || user.username;
            await user.save();
            return res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};

const getAllUsersById = async (req, res) => {
    try {
        const userId = req.params.id; // Retrieve the user ID from the URL parameters

        // Find the user by ID
        const user = await Registeruser.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user details
        res.json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server error');
    }
};



module.exports = { login, Register, Dashboard, getAllUsers, updateUserProfile, getAllUsersById }
