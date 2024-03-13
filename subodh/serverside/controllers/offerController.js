const Offers = require("../models/offerModel");
const User = require("../models/userModel")
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
// const Cookie = require("js-cookie")
// import Cookie from "js-cookie";
dotenv.config()

// get all offers
exports.getOffers = (req, res) => {
    Offers.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).send(error)
        })
}

// fetch offer by id
exports.getOfferById = async (req, res) => {
    const id = req.params.id;

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    console.log(userEmail)

    const user = await User.findOne({ email: userEmail });
    Offers.findById(id)
        .then((data) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_ADDRESS,
                    pass: process.env.PASSWORD
                },
            });

            const mailOptions = {
                from: {
                    name: 'Latest Offers',
                    address: 'subodh26548@gmail.com'
                },
                to: [user.email],
                subject: 'Latest Offers for you',
                html: `<h1>${data.title}</h1>
                        <p>Description: ${data.description}</p>
                        <p>Location: ${data.location}</p>
                        <p>Expiry Date: ${data.expiry_date}</p>
                `
            }

            const sendMail = async (transporter, mailOptions) => {
                try {
                    await transporter.sendMail(mailOptions);
                    console.log('Email has been sent!')
                } catch (error) {
                    console.log(error)
                }
            }

            sendMail(transporter, mailOptions);
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
}

// Add offers
exports.addOffer = (req, res) => {
    const NewOffer = req.body;
    if (NewOffer != null) {
        Offers.create(NewOffer)
            .then((response) => {
                res.status(201).send(response)
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })

    } else {
        res.status(400).send(`Empty data cannot be added`)
    }
}

