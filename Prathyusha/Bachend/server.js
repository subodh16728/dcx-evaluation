const express=require('express');
const mongoose=require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const offerRouter = require('./Routes/offerRouter');

const cors = require('cors');
const app=express();
 
const dburl = 'mongodb://127.0.0.1:27017/userdb';
 
mongoose.connect(dburl)
    .then(() => console.log("connection with mongodb is successful"))
    .catch(() => console.log("connection with mongodb failed"));
 
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.urlencoded({
    extended : true
}));


const userRouter = require('./Routes/userRouter');
const Offer = require('./models/offerModel'); 

 
app.use('/api',userRouter);
const productrouter=require('./Routes/productRouter');
app.use('/api/products',productrouter);

app.use('/api', offerRouter);

app.post('/api/sendemail', async (req, res) => {
    const { to, subject, text } = req.body;
  
    try {

      const offers = await Offer.find();
      // Create a transporter object using SMTP transport
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'prathyushakukala114@gmail.com', 
          pass: 'sirg fjia miih edss' 
        }
      });
  
      // Email options
      let mailOptions = {
        from: 'prathyushakukala114@gmail.com', 
        to: 'gurrammahesh52966@gmail.com', 
        subject: 'Hurray!! Great Offers are here',
        text: 'Hello User, Offers are waiting for u' + '\n\n' + formatOffers(offers)
      };
  
      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
      res.status(200).send('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email. Please try again later.');
    }
  });
  
  function formatOffers(offers) {
    let formattedOffers = "Available Offers:\n";
    offers.forEach(offer => {
      formattedOffers += `Offer Name: ${offer.offername}, Offer Code: ${offer.offercode}, Start Date: ${offer.startdate}, End Date: ${offer.enddate}\n`;
    });
    return formattedOffers;
  }
  
 
 
app.listen(4000,()=>{
    console.log("server running")
})