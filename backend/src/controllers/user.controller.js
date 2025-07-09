import httpStatus from "http-status";
import{User} from "../models/user.model.js";
import bcrypt ,{hash} from "bcrypt";
import crypto from "crypto";



const login = async (req,res)=>{
    const {username,password} = req.body;
    if(!username||!password){
        return res.status(400).json({message:"Please Provide username and password"})
    }
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message:"User not found"})
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(httpStatus.UNAUTHORIZED).json({message:"Invalid password"})
        }
        
        let token = crypto.randomBytes(20).toString("hex");
        user.token = token;
        await user.save();
        return res.status(httpStatus.OK).json({token: token, message: "Login successful"})
    }
    catch(e){
        console.error("Login error:", e);
        return res.status(500).json({message:  `Something went wrong ${e.message}`})
    }
}


const register = async(req,res)=>{
    const {name,username,password} = req.body;
    
    // Validate input
    if(!name || !username || !password){
        return res.status(400).json({message:"Please provide name, username and password"});
    }
    
    try{
        console.log("Registration attempt for:", {name, username});
        
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message:"User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name:name,
            username:username,
            password:hashedPassword
        });
        
        console.log("Saving new user to database...");
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser._id);

        res.status(httpStatus.CREATED).json({message:"User Registered Successfully"})
    }catch(e){
        console.error("Registration error:", e);
        res.status(500).json({message:`Something went Wrong: ${e.message}`});
    }
}

// Add to activity
const addToActivity = async (req, res) => {
    const { token, meeting_code } = req.body;
    if (!token || !meeting_code) {
        return res.status(400).json({ message: "Token and meeting code required" });
    }
    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(404).json({ message: "User not found" });
        user.activity = user.activity || [];
        user.activity.push({ meetingCode: meeting_code });
        await user.save();
        res.status(200).json({ message: "Activity added" });
    } catch (e) {
        res.status(500).json({ message: "Error adding activity" });
    }
};

// Get all activity
const getAllActivity = async (req, res) => {
    const { token } = req.query;
    if (!token) return res.status(400).json({ message: "Token required" });
    try {
        const user = await User.findOne({ token });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user.activity || []);
    } catch (e) {
        res.status(500).json({ message: "Error fetching activity" });
    }
};

export {login, register, addToActivity, getAllActivity}