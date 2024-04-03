const Offers=require("../Models/OffersModel");

//create my offers
exports.createOffersforusers = async (req, res) => {
    try {
        const { Title, Description, Discount, StartDate, EndDate, Availability, RedemptionMethod } = req.body;
        const newOffer = new Offers({
            Title,
            Description,
            Discount,
            StartDate,
            EndDate,
            Availability,
            RedemptionMethod
        });
        const savedOffer = await newOffer.save();
        res.status(201).json(savedOffer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to get all offers
exports.getAllOffers = async (req, res) => {
    try {
        const offers = await Offers.find();
        res.status(200).json(offers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to get an offer by its ID
exports.getOfferById = async (req, res) => {
    try {
        const offer = await Offers.findById(req.params.id);
        if (offer) {
            res.status(200).json(offer);
        } else {
            res.status(404).json({ message: 'Offer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const NodeMailer=require("nodemailer");
//Create transporter with Gmail SMTP configuration
const transporter=NodeMailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:465,
    secure:true,//User True for port 465 , false for other ports

    auth:{
        user:"beeramindhureddy@gmail.com",
        pass:"olmz zywo tjgr wpen"

        
    },
});

//Define Function to send mail

exports.sendEmail=async(req,res)=>{
    try{
        const{email,data}=req.body;
        //mail options
        const Mailoptions={
            from:{
                name:"BIR Mobile Product Offers",
                address:"beeramindhureddy@gmail.com"
            },
            to:[email],
            subject:" MObile Offers For You ",
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
    background-color: #E34C77;
  }.email {
    width: 80%;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px; /* Added border radius */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Added box shadow */
  }.email-header {
    background-color: #E34C77;
    color: #fff;
    padding: 20px;
    text-align: center;
    border-top-left-radius: 10px; /* Added border radius */
    border-top-right-radius: 10px; /* Added border radius */
  }.email-body {
    padding: 20px;
  }.email-footer {
    background-color: #E34C77;
    color: #000000;
    padding: 20px;
    text-align: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }.offer-box {
    width: 30%;
    padding: 20px;
    margin: 20px;
    border: 5px solid #5eaed3;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }</style>
  </head>
  <body>
                <div class="container">
                  <div class="email">
                    <div class="email-header">
                      <h1>Wow, what a fantastic opportunity! Don't miss out on this amazing deal <i></i></h1>
                    </div>
                    <div class="email-body">
                    <div className="offer-box">
                    <h3>${data.Title}!!</h3>
                    <p><strong>Description:</strong> ${data.Description}</p>
                    <p><strong>Discount:</strong> ${data.Discount}%</p>
                    <p><strong>Start Date:</strong> ${data.StartDate}</p>
                    <p><strong>End Date:</strong> ${data.EndDate}</p>
                  
                    <p><strong>Availability:</strong> ${data.Availability}</p>
                    <p><strong>Redemption Method:</strong> ${data.RedemptionMethod}</p>
                   
                </div>
                    </div>
                    <div class="email-footer">
                      <p>BIR.com  copyright 2024</p>
                    </div>
                  </div>
                </div>
              </body>
            </html>
          `


        }
        //Send Email part
        await transporter.sendMail(Mailoptions);
        console.log("Email Successfully sent!");
        res.status(200).json({message:"Email sent Successfully"});

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Failed to send email"})

    }
} 


 