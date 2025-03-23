import { UserModel } from '../models/user.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { registerUserValidator, loginUserValidator , updateUserValidator} from '../validators/users.js';
import { sendEMail } from '../utilities/mail.js';


export const registerUser = async(req, res, next) => {
   //Validate user information
   const {error, value} = registerUserValidator.validate(req.body);
   if (error) {
       return res.status(422).json(error);
   }
   //Check if user does not exist already
   const user = await UserModel.findOne({
       $or: [
           {username: value.username},
           {email: value.email}
       ]
       });
       if (user) {
           return res.status(409).json('User already exists!')
       }
   //Hash paintext password
   const hashedPassword = bcrypt.hashSync(value.password, 10);
   //Create user record in databse 
   // await UserModel.create({
   //     ...value,
   //     password: hashedPassword
   // });

    // Create user record in the database
    const newUser = await UserModel.create({
      ...value,
      password: hashedPassword
  });
    // Log the new user for debugging
    console.log('New User Created:', newUser);

    // Send registration email to user
    await sendEMail(
        newUser.email, // Recipient email
        "Welcome to Ramo's Notes", // Email subject
        `Hello ${newUser.username}, You are WELCOME!`, // Plain text email body
        newUser.username // Dynamic name for HTML template
    );
   //(optional) Generate access token for user
   // Return response
   res.status(201).json('User registered successfully!');
}


export const loginUser = async(req, res) => {
   //Validate user information
   const {error, value} = loginUserValidator.validate(req.body);
   if (error) {
       return res.status(422).json(error);
   }
   //Find matching user record in database
   const user = await UserModel.findOne({
       $or: [
           {username: value.username},
           {email: value.email}
       ]
       });
       if (!user) {
           return res.status(404).json('User does not exist');
       }
   //Compare incoming password with saved password
   const correctPassword = bcrypt.compareSync(value.password, user.password);
   if(!correctPassword) {
       res.status(401).json('Invalid credentials')
   }
   //Generate access token for the user
   const accessToken = jwt.sign(
       { id: user.id },
       process.env.JWT_SECRET_KEY,
       { expiresIn: '24h' }

   )
   // Return response
   res.status(200).json({ accessToken });

}

export const updateUser = async (req,res,) => {
   //Validate request body
   const {error, value} = updateUserValidator.validate(req.body);
   if (error) {
       return res.status(422).json(error);
   }
   //Update user in the database
   const result = await UserModel.findByIdAndUpdate(
       req.params.id,
       value,
       { new: true }
   )
   //Return response
   res.status(200).json(result)
}


// Get a user by ID
export const getUserById = async (req, res) => {
  
       // Find the user by ID
       const user = await UserModel.findById(req.params.id);
       if (!user) {
           return res.status(404).json({ error: 'User not found' });
       }
       // Return the user's details
       res.status(200).json(user);

};