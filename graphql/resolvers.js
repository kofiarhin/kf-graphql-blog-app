import db from "../data/_db.js";
import { GraphQLError } from "graphql";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { generateToken } from "../utility/helper.js";

import bcrypt from "bcryptjs";
const resolvers = {
  Query: {
    users: async (_, args, context) => {
      const users = await User.find();
      return users;
    },
    user: async (_, { id }, context) => {
      if (!context.user) {
        throw new GraphQLError("yOU are not authorized", {
          extentions: {
            code: "UNAUTHORIZED ACCESS",
          },
        });
      }

      return context.user;
    },

    posts: async (_, args) => {
      const posts = await Post.find();
      return posts;
    },
    post: async (_, { id }) => {
      // 649d7618f1e7cc1df28dbf1b
      const foundPost = await Post.findOne({ _id: id });
      return foundPost;
    },
  },
  Mutation: {
    createUser: async (_, { userInput: { name, email, password } }) => {
      // generate salt
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return newUser;
    },
    deleteUser: async (_, { id }, context) => {
      // check if user is logged in;
      if (!context.user) {
        console.log("you are not authorized");
        throw new GraphQLError("You are not authorized for this operation", {
          extensions: {
            code: "USER NOT FOUND",
          },
        });
      }

      // check if user logged in is the same user with data
      const foundUser = await User.findById(id);

      if (!foundUser) {
        throw new GraphQLError("Invalid email or password.", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      if (context.user._id.toString() !== foundUser._id.toString()) {
        throw new GraphQLError("you are not authorized", {
          extensions: { code: "UNAUTHORIZED OPERATION" },
        });
      }

      const user = await User.findByIdAndDelete(id);
      return user;
    },

    updateUser: async (_, { id, updateUserInput }, context) => {
      if (!context.user) {
        throw new GraphQLError("You are not authorized for this operation", {
          extensions: { code: "NOT AUTHORIZED" },
        });
      }

      // chedk if its the same user
      if (context.user._id.toString() !== id.toString()) {
        throw new GraphQLError("you are not authorized for this operation", {
          extensions: {
            code: "UNAUTHOZED_OPERATION",
          },
        });
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updateUserInput,
          },
        },
        { new: true }
      );
      return user;
    },

    createPost: async (_, { createPostInput: { title, body } }, context) => {
      if (!context.user) {
        throw new GraphQLError("You need to login to create post", {
          extensions: {
            code: "UNAUTHORIZED_ACCESS",
          },
        });
      }
      const { _id: user_id } = context.user;
      const newPost = await Post.create({
        title,
        body,
        user_id,
      });

      return newPost;
    },
    // DELETE POST
    deletePost: async (_, { id }, context) => {
      if (!context.user) {
        throw new GraphQLError("you need to login to delete this post", {
          extentions: { code: "NOT_AUTHORIZED" },
        });
      }

      const foundPost = await Post.findById(id);

      console.log(foundPost);

      if (!foundPost) {
        throw new GraphQLError("post not found", {
          extensions: { code: "POST_NOT_FOUND" },
        });
      }
      if (context.user._id.toString() !== foundPost.user_id.toString()) {
        throw new GraphQLError("you are not authorized to delete this post", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }
      // const post = await Post.findById(id);
      const deletedPost = await Post.findByIdAndDelete(id);
      return deletedPost;
    },

    updatePost: async (_, { id, updatePostInput }, context) => {
      if (!context.user) {
        throw new GraphQLError("You need to login to update this post", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }

      const foundPost = await Post.findById(id);

      if (context.user._id.toString() !== foundPost.user_id.toString()) {
        throw new GraphQLError("you are not authorized to update this post", {
          extensions: { code: "NOT_AUTHORIZED" },
        });
      }

      const post = await Post.findByIdAndUpdate(
        id,
        {
          $set: {
            ...updatePostInput,
          },
        },
        { new: true }
      );
      return post;
    },

    // LOGIN USER
    loginUser: async (_, { loginUserInput: { email, password } }) => {
      // get user from database
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("Invalid user details", {
          extensions: {
            code: "INVALID DETAILS",
          },
        });
      }

      // compase password
      const isValid = await bcrypt.compare(password, user.password);

      console.log(isValid);

      if (!isValid) {
        throw new GraphQLError("Invalid email or password.", {
          extensions: { code: "UNAUTHENTICATED USER" },
        });
      }

      // generate token
      const token = generateToken(user._id);

      console.log(token);

      return {
        ...user._doc,
        token,
      };
    },
  },

  Post: {
    user: async (parent) => {
      const userId = parent.user_id;
      const res = await User.findOne({ _id: parent.user_id });
      return res;
    },
  },

  User: {
    posts: async (parent) => {
      const res = await Post.find({ user_id: parent._id });
      return res;
    },
  },
};
export default resolvers;
