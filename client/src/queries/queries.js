import { gql } from "apollo-boost";

const getAllAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const getAllBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const addBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

const getBookQuery = gql`
  query($id: ID) {
    book(id: $id) {
      id
      name
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

const deleteBook = gql`
  mutation($id: ID!) {
    deleteBook(id: $id) {
      name
    }
  }
`;

export {
  getAllAuthorsQuery,
  getAllBooksQuery,
  addBookMutation,
  getBookQuery,
  deleteBook
};
