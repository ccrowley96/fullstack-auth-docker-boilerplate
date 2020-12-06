module.exports = {
    Query: {
        users: (_, __, { dataSources: { users} }) => {
            console.log('heeeere')
            console.log(dataSources)
            return users.getAllUsers();
        },
        user: (_, { email }, { dataSources: { users} }) =>
           users.findUser({email}),
        me: (_, __, { dataSources: { users}}) => {
            return users.findMe();
        }
    }
}