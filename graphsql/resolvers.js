const UserSchema = require('../models/User')
const MessageSchema = require('../models/Message')
const HouseSchema = require('../models/House')

const resolvers = {
  hello: () => {
    return "Hola mundo";
  },
  User: async (_, { id }) => {
    try {
      return user = await UserSchema.findById(id);
    } catch (error) {
      console.log(error)
    }
  },
  Users: async () => {
    try {
      return await UserSchema.find();
    } catch (error) {
      console.log(error)
    }
  },
  UserByFilter: async (_, { filter }) => {
    try {
      let query = {};
      if (filter) {
        if (filter.name) {
          //{name: "MAR"}
          query.name = { $regex: filter.name, $options: 'i' }// i se utiliza para hacer una busqueda
        }
        if (filter.email) {
          query.email = { $regex: filter.email, $options: 'i' }
        }
        if (filter.lastname) {
          query.lastname = { $regex: filter.lastname, $options: 'i' }
        }
        const users = await UserSchema.find(query)
        return users;
      }
    } catch (error) {
      console.log("error obteniendo al usuario")
      console.log(error)
    }
  },
  House: async (_, { id }) => {
    try {
      return house = await HouseSchema.findById(id);
    } catch (error) {
      console.log(error)
    }
  },
  Houses: async () => {
    try {
      return await HouseSchema.find();
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = resolvers
