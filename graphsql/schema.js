const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLInputObjectType, GraphQLSchema, GraphQLList } = require('graphql')
const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString },
    avatar: { type: GraphQLString }
  }
})

const Message = new GraphQLObjectType({
  name: 'Message',
  fields: {
    _id: { type: GraphQLID },
    body: { type: GraphQLString },
    from: { type: User },
    to: { type: User },
    readed: { type: GraphQLBoolean }
  }
})

const House = new GraphQLObjectType({
  name: 'House',
  fields: {
    _id: { type: GraphQLID },
    address: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    size: { type: GraphQLInt },
    type: { type: GraphQLString },
    zip_code: { type: GraphQLString },
    code: { type: GraphQLString },
    rooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLInt },
    price: { type: GraphQLInt },
    image: { type: GraphQLString }
  }
})

const UserFilterInput = new GraphQLInputObjectType({
  name: 'UserFilterInput',
  fields: {
    name: { type: GraphQLString },
    lastname: { type: GraphQLString },
    email: { type: GraphQLString }
  }
})

const queries = {
  hello: {
    type: GraphQLString,
    resolve: resolvers.hello
  },
  User: {
    type: User,
    resolve: resolvers.User,
    args: {
      id: { type: GraphQLID }
    }
  },
  Users: {
    type: GraphQLList(User),
    resolve: resolvers.Users
  },
  UsersByFilter: {
    type: GraphQLList(User),
    resolve: resolvers.UserByFilter,
    args: {
      filter: { type: UserFilterInput }
    }
  },
  House: {
    type: House,
    resolve: resolvers.House,
    args: {
      id: { type: GraphQLID }
    }
  },
  Houses: {
    type: GraphQLList(House),
    resolve: resolvers.Houses
  }
}


const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: queries
})

const schema = new GraphQLSchema({
  query: queryType
})

module.exports = schema
