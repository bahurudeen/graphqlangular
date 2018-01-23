// resolvers.js

const { GraphQLScalarType } = require("graphql");

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()), d.getFullYear()].join("/");
}

// Define Date scalar type.

const GQDate = new GraphQLScalarType({
  name: "GQDate",
  description: "Date type",
  parseValue(value) {
    // value comes from the client
    return value; // sent to resolvers
  },
  serialize(value) {
    // value comes from resolvers
    return value; // sent to the client
  },
  parseLiteral(ast) {
    // value comes from the client
    return new Date(ast.value); // sent to resolvers
  }
});

// data store with default data
const registrations = [
  {
    id: 1,
    firstName: "Johan",
    lastName: "Peter",
    dob: new Date("2014-08-31"),
    email: "johan@gmail.com",
    password: "johan123",
    country: "UK"
  },
  {
    id: 2,
    firstName: "Mohamed",
    lastName: "Tariq",
    dob: new Date("1981-11-24"),
    email: "tariq@gmail.com",
    password: "tariq123",
    country: "UAE"
  },
  {
    id: 3,
    firstName: "Nirmal",
    lastName: "Kumar",
    dob: new Date("1991-09-02"),
    email: "nirmal@gmail.com",
    password: "nirmal123",
    country: "India"
  }
];

const resolvers = {
  Query: {
    Registrations: () => registrations, // return all registrations
    Registration: (_, { id }) =>
      registrations.find(registration => registration.id == id) // return registration by id
  },
  Mutation: {
    // create a new registration
    createRegistration: (root, args) => {
      // get next registration id
      const nextId =
        registrations.reduce((id, registration) => {
          return Math.max(id, registration.id);
        }, -1) + 1;
      const newRegistration = {
        id: nextId,
        firstName: args.firstName,
        lastName: args.lastName,
        dob: args.dob,
        email: args.email,
        password: args.password,
        country: args.country
      };
      // add registration to collection
      registrations.push(newRegistration);
      return newRegistration;
    }, // delete registration by id
    deleteRegistration: (root, args) => {
      // find index by id
      const index = registrations.findIndex(
        registration => registration.id == args.id
      );
      // remove registration by index
      registrations.splice(index, 1);
    }, // update registration
    updateRegistration: (root, args) => {
      // find index by id
      const index = registrations.findIndex(
        registration => registration.id == args.id
      );
      registrations[index].firstName = args.firstName;
      registrations[index].lastName = args.lastName;
      registrations[index].dob = args.dob;
      registrations[index].email = args.email;
      registrations[index].password = args.password;
      registrations[index].country = args.country;
      return registrations[index];
    }
  },
  GQDate
};

module.exports.Resolvers = resolvers;
