const userModel = require('../models/user'); 
const{ hashPassword, comparePassword} = require('../helpers/passbcrypt');
const jwt = require('jsonwebtoken');

registerHandler = async (req,res) =>{
    try {
        const {name,email, password, phone, address, answer} = req.body
        if(!name){
            return res.status(400).send({
                success: false,
                message: 'Name is required'
            })
        } 
        if(!email){
            return res.status(400).send({
                success: false,
                message: 'Email is required'
            })
        }
        if(!password){
            return res.status(400).send({
                success: false,
                message: 'Password is required'
            })
        }
        if(!phone){
            return res.status(400).send({
                success: false,
                message: 'Phone number is required'
            })
        }
        if(!address){
            return res.status(400).send({
                success: false,
                message: 'Address is required'
            })
        }
        if(!answer){
            return res.status(400).send({
                success: false,
                message: 'Answer is required'
            })
        }

        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(200).send({
                success: false,
                message: 'Already Register Please Login'
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({name,email, password:hashedPassword,phone,address,answer}).save();
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user
        })
    } 
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in registration',
            error
        })
        
    }
};

loginHandler = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }

        let token = await jwt.sign({_id: user._id}, process.env.JWT_SECRETKEY,{
            expiresIn: '7d'
        })
        res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            user:{
                _id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}; 

adminLoginHandler = async (req, res) => {
    try {
        console.log("Request received:", req.body); 
        const { name, password } = req.body;
        console.log(process.env.ADMIN_NAME, process.env.ADMIN_SECRET_KEY)

        if (!name || !password) {
            console.log("Missing credentials");
            return res.status(400).json({ success: false, message: "Name and password are required" });
        }

        if (name === process.env.ADMIN_NAME && password === process.env.ADMIN_SECRET_KEY) {
            const token = jwt.sign({name}, process.env.JWT_SECRETKEY, { expiresIn: '1h' });
            console.log("Admin authenticated, token generated");
            console.log(token);
            return res.status(200).json({ success: true, token });
        } else {
            console.log("Invalid credentials");
            return res.status(401).json({ success: false, message: "Invalid name or password" });
        }
    } catch (error) {
        console.error("Error in adminLoginHandler:", error); // Log error details
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

forgotHandler = async (req,res) =>{
    try {
        const {email, answer, newPassword} = req.body
        if(!email){
            return res.status(400).send({
                message: 'Email is required'
            })
        }
        if(!answer){
            return res.status(400).send({
                message: 'answer is required'
            })
        }
        if(!newPassword){
            return res.status(400).send({
                message: 'New Password is required'
            })
        }
        const user = await userModel.findOne({email,answer})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed})
        res.status(200).send({
            success: true,
            message: 'Password changed successfully'
        })
    } 
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }

}
getTotalUsers = async (req,res) =>{
    try {
        const total = await userModel.find({})
        res.status(200).send({
            success: true,
            message: 'Users fetched successfully',
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting users',
            error
        })
    }
}

updateProfile = async(req,res)=>{
    try {
        const {name,email,password,address,phone} = req.body
        const user = await userModel.findById(req.user._id)
        if(password && password.length < 6){
            return res.status(400).send({
                message: 'Password should be at least 7 characters long'
            })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined 
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
            email: email || user.email,
        }, {new:true})
        res.status(200).send({
            success: true,
            message: 'Profile updated successfully',
            updatedUser,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating profile',
            error,
            error,
        })
    }
}

getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id).select('-password -role');
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
  
      res.status(200).json({
        success: true,
        user
      });
    } catch (error) {
      console.error('Error in getUserById:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching user details',
        error: error.message
      });
    }
  };
testHandler = (req, res) =>{
    res.send("testHandler")
}

module.exports = {registerHandler, loginHandler, testHandler, forgotHandler, adminLoginHandler, getTotalUsers,updateProfile, getUserById}