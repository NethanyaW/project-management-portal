import { Router } from 'express';
import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler'
import UserController from '../controller/User.controller';
import { sample_users } from '../samples/users';
import UserModel from '../models/User.model';

const app = Router();

app.get('/seed', asyncHandler(async (req, res) => {
    const userCount = await UserModel.countDocuments();
    if(userCount>0) {
        res.send("Users are Seeding...");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seeding is done");
}))

app.route('/')
    .get(UserController.getUsers)
    .post(UserController.createUsers);

app.route('/:id')
    .get(UserController.getUser)
    .patch(UserController.putUser)
    .delete(UserController.deleteUser);



// app.route('/login')
// .post(async (req:any, res:any) => {
//   const userBody = req.body;
//   const user = sample_users.find((user) => user.email === userBody.email && user.password === userBody.password);  

//   if(user) {
//     res.send(generateToken(user));
//   } else {
//     res.status(400).send("User Not found! Check email and password.");
//   }
// });

app.post("/login", asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await UserModel.findOne({email , password});
  
       if(user) {
        res.send(generateTokenReponse(user));
       }
       else{
         const BAD_REQUEST = 400;
         res.status(BAD_REQUEST).send("Username or password is invalid!");
       }
  
    }
));

app.post("/register", asyncHandler(
    async (req, res) => {
        const {name, email, password, address } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            res.status(httpStatus.BAD_REQUEST).send("Entered Email has already Taken");
            return;
        }

        const encryptP = await bcrypt.hash(password , 10);

        const newUser = {
            id: '',
            name: name,
            email: email,
            address: address,
            password: encryptP,
            isAdmin: false
        };

        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenReponse(newUser));
}))
  
    const generateTokenReponse = (user : any) => {
      const token = jwt.sign({
        id: user.id, email:user.email, isAdmin: user.isAdmin
      },"thisIsSecret",{
        expiresIn:"30d"
      });
  
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
      };
    }


export default app;