const User = require("../model/userModel.js");
const bcrypt = require('bcrypt');
const generateUserToken = require("../utils/generateToken.js");

const getAllUsers = async(req, res, next) => {
  try {
    const users = await User.find(req.query);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
      }

  res.json({ success: true, users });
      } 
catch (error) {
  res.status(error.status || 500).json({ message: error.message ||('Error fetching users')});
}
};
  const getAUserById = async(req, res, next) => {
        try{
          const users = await User.findById(req.params._id).exec();
          if (!users) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, users });
      }
        
       catch(error){
        if (error.kind === 'ObjectId') {
          return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
        res.status(404).send('User Not Found')
       }
    }
    const addUser = async(req, res, next) => {
    try{
      
        const { name, email, userId, password, mobile, profilePic, role } = req.body;
        if (!name || !email || !role || !password ) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(404).json({ success: false, message: "user already exist" });
        }
        const saltRounds =10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        const users = new User({ name, email, userId, password: hashedPassword, mobile, profilePic, role });
        await users.save()
        const token = generateUserToken(email);

        res.cookie("token", token);
        res.json({ success: true, message: "User created successfully" });
      }
        catch (error) {
          res.status(400).send('Error Adding User');
          console.log(error)
        }
      }  
      const userLogin = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ success: false, message: "All fields required" });
            }
    
            const userExist = await User.findOne({ email });
    
            if (!userExist) {
                return res.status(409).json({ success: false, message: "User does not exist" });
            }
    
            const passwordMatch = bcrypt.compareSync(password, userExist.password);
    
            if (!passwordMatch) {
                return res.status(400).json({ success: false, message: "User not authenticated" });
            }
    
            const token = generateUserToken(email);
    
            res.cookie("token", token);
    
            res.json({ success: true, message: "user login successfully" });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || "Login failed" });
        }
    };
   const userLogout = async (req, res, next) => {
        try {
            res.clearCookie("token");
    
            res.json({ success: true, message: "user logout successfully" });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || "Could not Logged out" });
        }
    };
    
    const userProfile = async (req, res, next) => {
        try {
            const { id } = req.params;
            const useData = await User.findById(id).select("-password");
    
            res.json({ success: true, message: "User data fetched", data: useData });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || "Internal server error" });
        }
    };
    
    const checkUser = async (req, res, next) => {
        try {
            const user = req.user;
    
            if (!user) {
                return res.status(401).json({ success: false, message: "User not authenticated" });
            }
            res.json({ success: true, message: "User authenticated" });
        } catch (error) {
            res.status(error.status || 500).json({ message: error.message || "Internal server error" });
        }
    };
      const updateAUserById =async (req, res, next) => {
       try{
        const user = req.params._id;
        const { name, email, mobile, profilePic, role } = req.body;
        const updateUser = await User.findByIdAndUpdate(user, { name, email, mobile, profilePic, role }, {new:true})
        if (!updateUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }
        res.json({ success: true, user: updateUser })
       }
       catch{
        if (error.kind === 'ObjectId') {
          return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
      res.status(500).json({ success: false, message: "An error occurred while updating the user" });
    }
      }
      const deleteAUserById = (req, res) => {
        res.send('delete a User by id')
      }

    module.exports = {getAllUsers, getAUserById, addUser, userLogin, userLogout, userProfile, checkUser, updateAUserById, deleteAUserById}