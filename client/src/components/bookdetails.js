import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery, deleteBook, getAllBooksQuery } from "../queries/queries";
import { client } from "../App";

class BookDetails extends Component {
  displayBookDetails() {
    const { book } = this.props.data;
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All Books by this author:</p>
          <ul className="other-books">
            {book.author.books.map(item => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected.</div>;
    }
  }
  deleteBook() {
    client.mutate({
      mutation: deleteBook,
      variables: {
        id: this.props.bookId
      },
      refetchQueries: [{ query: getAllBooksQuery }]
    });
  }
  render() {
    const enabled = this.props.bookId !== null;
    return (
      <div id="book-details">
        {this.displayBookDetails()}
        <button hidden={!enabled} onClick={this.deleteBook.bind(this)}>
          Delete Book
        </button>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    };
  }
})(BookDetails);
