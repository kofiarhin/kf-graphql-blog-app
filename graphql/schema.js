const typeDefs = `#graphql

type User {
    _id: ID
    name: String
    email: String
    password: String
    posts: [Post]
}

type Post { 
    _id: ID,
    title: String
    body: String,
    user_id: String
    user: User
}

type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
}

type Login {
    name: String
    email: String
    token: String
}

type Mutation {
    createUser(userInput: UserInput): User
    updateUser(id: ID!, updateUserInput: UpdateUserInput) : User
    deleteUser(id: ID!): User
    createPost(createPostInput: CreatePostInput): Post
    deletePost(id: ID!): Post
    updatePost(id: ID!, updatePostInput: UpdatePostInput): Post
    loginUser(loginUserInput: LoginUserInput): Login
}

input LoginUserInput { 
    email: String!
    password: String!
}

input UpdatePostInput {
    title: String
    body: String
}

input CreatePostInput {
    title: String
    body: String
}

input UpdateUserInput {
    name: String
    email: String
    password: String
}

input UserInput {
    name: String
    email: String
    password: String
}
`;

export default typeDefs;
