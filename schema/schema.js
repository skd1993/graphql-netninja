const graphql = require('graphql');
const _ = require('lodash');

//describing object types - basically the tables
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
let books = [
    {name: "book1", genre: "genre1", id: "1", authorid: "1"},
    {name: "book2", genre: "genre2", id: "2", authorid: "3"},
    {name: "book3", genre: "genre3", id: "3", authorid: "1"},
    {name: "book4", genre: "genre4", id: "4", authorid: "2"},
];

let authors = [
    {name: "author1", age: 11, id: "1"},
    {name: "author2", age: 22, id: "2"},
    {name: "author3", age: 33, id: "3"},
];

// even tho id is stored as string in data, it is searchable as integer or string both using GraphQLID as it finally converts to string only

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid});
            }
        },
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: {type: GraphQLID} }, //define which args are reqd qith the query
            resolve(parent, args) {
                // code to get data from db/ other sources
                // console.log(typeof(args.id)) // will print out string
                return _.find(books, {id: args.id});
            }
        },
        author: {
            type: AuthorType,
            args: { id: {type: GraphQLID} },
            resolve(parent, args) {
                // code to get data from db/ other sources
                // console.log(typeof(args.id)) // will print out string
                return _.find(authors, {id: args.id});
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});