const { gql } = require('apollo-server-express');

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

   type Post{
      id: ID!
      author: User
      title: String
      content: String
   }

   type Query {
      users: [User]!
      user(id: ID!): User
      posts: [Post]!
      post(id: ID!): Post
      me: User
   }

   type Mutation {
      createPost(authorId: ID!, title: String, content: String): postUpdateResponse!
   }

   type postUpdateResponse {
      success: Boolean!
      message: String
      posts: [Post]
    }
`;

module.exports = typeDefs;