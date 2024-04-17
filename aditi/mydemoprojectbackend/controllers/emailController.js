
const dotenv = require("dotenv")
dotenv.config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendEmail = async(req,res) => {
  try {
    const { email, data } = req.body;


    // Mail options
    const mailOptions = {
        from: {
            name: 'MyProject Test Offers',
            address: 'kashyapaditipritam@gmail.com'
        },
        to: [email],
        subject: `You're missing out on unbeatable savings!`,
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>NodeMailer Email Template</title>
            <style>
              .container {
                width: 100%;
                height: 100%;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .email {
                width: 80%;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
              }
              .email-header {
                background-color: #09b057;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .email-body {
                padding: 20px;
              }
              .email-footer {
                background-color: #09b057;
                color: #000000;
                padding: 20px;
                text-align: center;
              }
              .offer-box {
                width: 30%;
                padding: 20px;
                margin: 20px;
                border: 5px solid #5eaed3;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email">
                <div class="email-header">
                  <h1>Knock Knock!${email} Grab the deal</h1>
                </div>
                <div class="email-body">
                <div className="offer-box">
                <h3>${data.tittle}!!</h3>
                <p><strong>Description:</strong> ${data.description}</p>
                <p><strong>Discount:</strong> ${data.discount}%</p>
                <p><strong>Start Date:</strong> ${data.startDate}</p>
                <p><strong>End Date:</strong> ${data.endDate}</p>
               
            </div>
                </div>
                <div class="email-footer">
                  <p>MyProject Test</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `

    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent!');

    // Respond with success message
    res.status(200).json({ message: 'Email sent successfully' });
} catch (error) {
    // Handle error
    console.log(error);
    res.status(500).json({ error: 'Failed to send email' });
}
};


// Export the function so it can be used in other files
module.exports = { sendEmail };
