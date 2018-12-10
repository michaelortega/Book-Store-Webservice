import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAllAuthorsQuery,
  addBookMutation,
  getAllBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors() {
    let data = this.props.getAllAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading Authors..</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  submitForm(event) {
    event.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getAllBooksQuery }]
    });
    this.setState({ name: "" });
    this.setState({ genre: "" });
  }

  render() {
    const isEnabled =
      this.state.name.length > 1 &&
      this.state.genre.length > 1 &&
      this.state.authorId.length > 0;
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book Name:</label>
          <input
            type="text"
            onChange={e => this.setState({ name: e.target.value })}
            value={this.state.name}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            onChange={e => this.setState({ genre: e.target.value })}
            value={this.state.genre}
          />
        </div>
        <div className="field">
          <label>Author Name:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button disabled={!isEnabled}>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAllAuthorsQuery, { name: "getAllAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
