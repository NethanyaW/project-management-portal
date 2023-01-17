import { NextFunction } from "express";
import UsersService from "../services/Users.service";

class UserController {
    constructor() {}

    async getUsers (req:any, res:any) {
        const users = await UsersService.getAllUsers();
        res.json(users);
    }

    async createUsers (req:any, res:any) {
        const newUser = await UsersService.createUser(req.body);
        res.json(newUser);
    }

    async getUser (req:any, res:any) {
        const id = req.params.id;
        const user = await UsersService.getUser(id);
        res.json(user);
    }

    async putUser(req:any, res:any) {
        const id = req.params.id;
        console.log(id);
        const obj = req.body;
        console.log(id);
        console.log(obj);
        const user = await UsersService.putUser(id, obj);
        res.json(user);
    }

    async deleteUser (req:any, res:any) {
        const id = req.params.id;
        const user = await  UsersService.deleteUser(id);
        res.json(user);
    }

    async getUserForLogin (req:any, res:any, next:NextFunction) {
        console.log(req.body);
        const username = req.body.username;
        const password = req.body.password;
        const result = await  UsersService.getUserforLogin(username, password);
        // if(result.logged){
        //     req.session.user = {username: result.user?.username, role: result.role, email: result.user?.email, logged: true};
        //     console.log(req.session);
        //     res.json(req.session);
        // } else {
        //     console.log("Next");
        //     next();
        // }
        
        // res.json(result);
    }
}

export default new UserController;