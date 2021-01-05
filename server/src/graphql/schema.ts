import { gql } from 'apollo-server-express';

const typeDefs = gql`
   type User{
      id: ID!
      name: String
      email: String
      given_name: String
      family_name: String
      picture: String
      registered: String
   }

   type Query {
      users: [User]!
      user(id: ID!): User
      me: User
   }
`;

export default typeDefs;