// const usermodel=require("../Models/RegisterModel");
const usermodel=require("../Models/RegisterModel");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");

exports.getAllUsers=(req,res)=>{
    usermodel.find()
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(400).send({error:err}));
}



exports.createUser=async(req,res)=>{
    try{
        const {name,email,password,confirmpassword}=req.body;
      let exist = await usermodel.findOne({email:email})
      if(exist){
          return res.status(400).send('User already exists')
      }
      if(password !== confirmpassword){
          return res.status(400).send('Passwords not matches');
      }
      const hash=await bcrypt.hash(password, 10);
      
      let newUser=new usermodel({
          name,
          email,
          password:hash,
          
      })
      await newUser.save();
      res.status(200).send('registered successfully')
 
 
      }catch(err){
          console.log(err)
          return res.status(500).send('internal server error')
      }
    
}
exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!email || !password){
            return res.status(400).send("Email or password required");
        }
        const user=await usermodel.findOne({email})
        if(!user){
            return res.status(401).send("Invalid Email");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ message: "Invalid  password" });
        }
        let payload={
            user:{
                id:user.id
            }, 
            email: email

        }
        const token=jwt.sign(payload,"indhu",{expiresIn:36000000})
        
            res.status(200).json({message:"Login successfull",token:token})
          
        
        

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
}

exports.getObject=async(req,res)=>{
    try{
        let exist=await usermodel.findById(req.user.id);
        if(!exist){
            return res.status(400).send("User not found");
        }
        res.json(exist);

    }
    catch(err){
        console.log(err)
        return res.status(500).send("Server Error")
    }
}
//get user by ID
exports.getUserByID=(req,res)=>{
    const id=req.params.id;
    if(id!=null){
        usermodel.findById(id)
        .then((data)=>{
            if(data!==null && data!==undefined){
                res.status(200).json(data);
            }
            else{
                res.status(400).send("Id not found");
            }
        })
        .catch((err)=>{
            return res.status(500).send("Server Error")
        })
    }
}
// Update the user
exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const updateValue = req.body;
    usermodel.findByIdAndUpdate(id, updateValue)
        .then((data) => {
            if (!data) {
                return res.status(400).send("User Not Found");
            }
            return res.status(200).send("Updated Successfully");
        })
        .catch((err) => {
            console.error("Update error:", err);
            res.status(400).send("Bad Request" + err);
        });
};

