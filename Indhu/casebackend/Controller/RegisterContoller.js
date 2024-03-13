// const usermodel=require("../Models/RegisterModel");
const usermodel=require("../Models/RegisterModel");
const jwt=require("jsonwebtoken")

exports.getAllUsers=(req,res)=>{
    usermodel.find()
    .then((data)=>res.status(200).json(data))
    .catch((err)=>res.status(400).send({error:err}));
}



exports.createUser=async(req,res)=>{
    try{
        
        const {name,email,password,confirmpassword}=req.body;
        if (!name || !email || !password || !confirmpassword) {
            return res.status(400).json({
                message:"All feilds are required",
                error:true,
                success:false
            })
        }
        // if(password.length()<6){
        //     return res.status(400).json({
        //         message:"The password length minimum 6",
        //         error:true,
        //         success:false
        //     })
        // }
        let exists=await usermodel.findOne({email})
        if(exists){
            return res.status(400).json({
                message:"user already exists",
                error:true,
                success:false
            })
        }
        if(password!==confirmpassword){
            return res.status(400).json({
                message:"password and confirmpassword must be same",
                error:true,
                success:false
            })
        }

        let newUser= new usermodel({
            name,email,password,confirmpassword
        })
        newUser.save();
        return res.status(200).json({
            message:"Registered Successfully",
            error:false,
            success:true
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error",
            error:true,
            success:false
        })

    }
    
}
exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;
        let exist=await usermodel.findOne({email})
        if(!exist){
            return res.status(400).send("User Not Found")
        }
        if(exist.password!==password){
            return res.status(400).send("Invalid Credentials")
        }
        let payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload,"indhu",{expiresIn:36000000},
        (err,token)=>{
            if(err) throw err;
            return res.json({token})
        }
        )

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