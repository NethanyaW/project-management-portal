import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const objectID = mongoose.Types.ObjectId;

const User = new Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    isAdmin: Boolean
},{
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

const UserModel = mongoose.model("User", User);

export default UserModel;
