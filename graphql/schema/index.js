import { buildSchema } from 'graphql'


 module.exports = buildSchema(`
                                type Event {
                                    _id: String!
                                    title: String!
                                    description: String!
                                    price: Float!
                                    date: String!
                                    creator: User
                                }

                                input EventInput {
                                    title: String!
                                    description: String!
                                    price: Float!
                                    date: String!
                                }

                                type User {
                                    _id: String!
                                    email: String!
                                    password: String
                                    createdEvents: [Event!]
                                }

                                input UserInput {
                                    email: String!
                                    password: String!
                                }

                                type RootQuery {
                                    events : [Event!]!
                                    users :[User!]!
                                }
                                type RootMutation{
                                    createEvent(eventInput:EventInput) : Event
                                    createUser(userInput:UserInput) : User
                                }

                                schema{
                                    query:RootQuery
                                    mutation:RootMutation
                                }
                        `);