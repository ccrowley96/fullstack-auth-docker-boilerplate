const { MongoDataSource } = require('apollo-datasource-mongodb');
const { User } = require('../../db/index');

class Users extends MongoDataSource{
    async findMe(){
        const email = this.context?.user?.email;
        if(!email) return null;

        const user = await User.findOne({email});
        return user;
    }

    async findUser(email){
        if(!email) return null;

        const user = await User.findOne({email});
        return user ? user : null;
    }

    async getAllUsers(){
        const users = await User.find({});
        return users;
    }
}

module.exports = Users;