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
  },
  HousesByFilter: async (_, { filter }) => {
    try {
      let query = {}
      if (filter) {
        if (filter.address) {
          query.address = { $regex: filter.address, $options: 'i' }
        }
        if (filter.city) {
          query.city = { $regex: filter.city, $options: 'i' }
        }
        if (filter.size) {
          query.size = { size: filter.size }
        }
        if (filter.rooms) {
          query.rooms = { rooms: filter.rooms }
        }
        if (filter.bathrooms) {
          query.bathrooms = { bathrooms: filter.bathrooms }
        }
        if (filter.price) {
          query.price = { price: filter.price }
        }
        const houses = await HouseSchema.find(query)
        return houses;
      }
    } catch (error) {
      console.log(error)
    }
  },
  MessagesByFilter: async (_, { filter }) => {
    try {
      let query = {}
      if (filter) {
        if (filter.from) {
          query = { from: filter.from }
        }
        if (filter.to) {
          query = { to: filter.to }
        }
        if (filter.body) {
          query.body = { $regex: filter.body, $options: 'i' }
        }
        const message = await MessageSchema.find(query).populate('from').populate('to')

        return message;
      }
    } catch (e) {
      console.log("Error obteniendo el mensaje")
    }
  },
  Message: async (_, { id }) => {
    try {
      return message = await MessageSchema.findById(id).populate({
        path: 'from',
        select: '-password'
      })
        .populate({
          path: 'to',
          select: '-password'
        });

    } catch (e) {
      console.log(e)
    }
  },
  Messages: async () => {
    try {
      return await MessageSchema.find().populate({
        path: 'from',
        select: '-password'
      }).populate({
        path: 'to',
        select: '-password'
      })
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = resolvers
