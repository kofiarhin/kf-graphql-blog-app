import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema.js";
import resolvers from "./graphql/resolvers.js";
import connectDB from "./config/db.js";
import reset from "./utility/reset.js";
import jwt from "jsonwebtoken";
import User from "./models/userModel.js";
import { GraphQLError } from "graphql";
// coneect to database
connectDB();
// reset();

const server = new ApolloServer({
  // type definitions
  typeDefs,
  // resolvers
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      // get user
      const user = await User.findById(id);

      if (user) {
        const { name, email, _id } = user;
        return { user: { name, email, _id } };
      }
    }
  },
  listen: { port: process.env.PORT },
});

console.log("server started");
