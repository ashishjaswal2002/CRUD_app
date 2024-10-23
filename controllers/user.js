const multer = require('multer');
const User = require('../models/users')


async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({});
    if (!allDbUsers.length) return res.status(404).json({ message: 'No users found' });
    return res.json(allDbUsers);
}


async function addUsers(req, res,err) {
    const { name } = req.body;
    const file = req.file;

    
    if (!name || !file) {
        return res.status(400).json({ message: "Name and image file are required." });
    }


    const user = new User({
        name: name,
        Image: file.path 
    });

    if(err instanceof multer.MulterError){
        return res.status(400).json({message:"A multer error occurred"});
    }
  
    try {

        const newUser = await user.save();
        return res.status(201).json(newUser);
    } catch (err) {

        return res.status(500).json({ message: "Error saving user.", error: err.message });
    }
}



async function updatingUsers(req,res){
    try{

    
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }


    const name = req.body;
    if(name){
        user.name = name;
    }

    if(req.file){
        user.Image = req.file.path;

    }
    const updatedUser = await user.save();
    return res.status(200).json({
        message:"User updated successfully",
        user:updatedUser
    })
}
catch(err){
    return res.status(500).json({
        message: 'Error while updating user',
        error: err.message
    });
}
    
}

async function deleteUser(req,res){

    try {
       
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

       await user.deleteOne();

        res.json({ message: 'User deleted successfully' });
    } catch (err) {
   
        res.status(500).json({ message: 'Error deleting user', error: err.message });
    }
}

module.exports = {
    handleGetAllUsers,addUsers, updatingUsers,deleteUser

}