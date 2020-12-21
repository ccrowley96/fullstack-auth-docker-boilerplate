import { MongoDataSource } from 'apollo-datasource-mongodb';
import { User } from '../../db/index';
import mongoose from 'mongoose';

export default class Users<TData> extends MongoDataSource<TData>{
    async findUser(id){
        if(!id) return null;
        const user = await User.findById(new mongoose.Types.ObjectId(id));
        return user ? user: null;
    }

    async getAllUsers(){
        const users = await User.find({});
        return users;
    }
}