import books from "./mock";

const resolvers = {
    Query: {
      books: () => books,
    },
};

export default resolvers;