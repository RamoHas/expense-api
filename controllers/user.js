import { UserModel } from '../models/user.js';

export const createUser = async (req, res) => {
   const { name, email, password } = req.body; 
   try {
      const user = new UserModel({ name, email, password }); 
      await user.save();
      res.status(201).json({ message: 'User created', user });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const getUsers = async (req, res) => {
   try {
      const users = await UserModel.find();
      res.json({ users });
   } catch (error) {
      res.status(400).json({ error: error.message });
   }
};

export const getUserById = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters
    try {
       const user = await UserModel.findById(id);
       if (!user) {
          return res.status(404).json({ error: "User not found" });
       }
       res.json({ user });
    } catch (error) {
       res.status(400).json({ error: error.message });
    }
 };

