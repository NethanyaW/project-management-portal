import User from '../models/User.model';

class UserService {
    constructor() {}

    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async createUser(user: any) {
        const newUser = new User(user);
        const createdUser = await newUser.save();
        return createdUser;
    }

    async getUser(id: any) {
        const user = await User.findById(id);
        return user;
    }

    async putUser(id: any, obj: any) {
        const user = await User.findByIdAndUpdate(id, obj);
        return user;
    }

    async deleteUser(id: any) {
        const delUser = await User.findByIdAndDelete(id);
        return delUser;
    }

    async getUserforLogin(username: String, password: String) {
        console.log(username+"||"+password);
        const user = await User.findOne({username});
        console.log(user);
        if(user?.password==password) {
            return {user:user, logged: true, role: "User"};
        } else {
            return {logged: false};
        }
    }
}

export default new UserService;