const { MongoDataSource } = require('apollo-datasource-mongodb');
const { User } = require('../../db/index');
const ObjectId = require('mongoose').Types.ObjectId;

class Users extends MongoDataSource{
    async findUser(id){
        if(!id) return null;
        const user = await User.findById(new ObjectId(id));
        return user ? user: null;
    }

    async getAllUsers(){
        const users = await User.find({});
        return users;
    }
}

module.exports = Users;