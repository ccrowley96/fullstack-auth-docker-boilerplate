export default {
    Query: {
        users: (_, __, { dataSources: { users } }) => {
            return users.getAllUsers();
        },
        user: (_, { id }, { dataSources: { users } }) =>{
            return users.findUser(id)
        },
        me: (_, __, { user}) => {
            return user
        }
    }
}