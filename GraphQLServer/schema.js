// schema.js

const schema = `
# declare custom scalars for date as GQDate
scalar GQDate

# registration type
type Registration {
    id: ID!
    firstName: String
    lastName: String
    dob: GQDate
    email: String
    password: String
    country: String
}

type Query {
    # Return a registration by id
    Registration(id: ID!): Registration
    # Return all registrations
    Registrations(limit: Int): [Registration]
}

type Mutation {
    # Create a registration
    createRegistration (firstName: String,lastName: String, dob: GQDate, email: String, password: String, country: String): Registration
    # Update a registration
    updateRegistration (id: ID!, firstName: String,lastName: String, dob: GQDate, email: String, password: String, country: String): Registration
    # Delete a registration
    deleteRegistration(id: ID!): Registration
}
`;

module.exports.Schema = schema;
