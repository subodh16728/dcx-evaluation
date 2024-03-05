
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
            return res.status(400).send('User already exists')
        }
        if (password !== confirmpassword) {
            return res.status(400).send('Passwords not matches');
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


module.exports = { login, Register, Dashboard }
