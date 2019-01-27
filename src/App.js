import React from 'react'
import { Route } from 'react-router-dom'
import BookShelves from './BookShelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
    this.changeShelf = this.changeShelf.bind(this);
    this.getCurrentShelf = this.getCurrentShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({books: books}));
  }

  changeShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then(() => {
      this.setState(state => {
        const changedBook = state.books.filter(prevStateBook => {
          return prevStateBook.id === book.id;
        });
        if(changedBook[0]) {
          changedBook[0].shelf = newShelf;
        } else {
          book.shelf = newShelf;
          state.books.push(book);
        }

        return state;
      });
    })
  }

  getCurrentShelf(book) {
    const currentBook = this.state.books.filter(b => b.id === book.id);
    if(currentBook[0]) {
      return currentBook[0].shelf;
    }

    return 'none';
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) =>
          <Search
            hideSearchPage={() => history.push("/")}
            onShelfChange={this.changeShelf}
            getCurrentShelf={this.getCurrentShelf}
          />
        }/>
        <Route exact path="/" render={({history}) =>
          <BookShelves
            showSearchPage = {() => history.push("/search")}
            onShelfChange={this.changeShelf}
            books={this.state.books}
          />
        }/>
      </div>
    )
  }
}

export default BooksApp