import React from 'react'
import BookShelves from './BookShelves'
import Search from './Search'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      showSearchPage: false
    }
    this.changeShelf = this.changeShelf.bind(this);
    this.getCurrentShelf = this.getCurrentShelf.bind(this);
    this.showSearchPage = this.showSearchPage.bind(this);
    this.hideSearchPage = this.hideSearchPage.bind(this);
  }

    componentDidMount() {
      BooksAPI.getAll().then((books) => console.log(books));
      BooksAPI.getAll().then((books) => this.setState({books: books}));
    }

  changeShelf(book, newShelf) {
    var App = this;

    BooksAPI.update(book, newShelf).then(() => {
      App.setState(state => {
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

  showSearchPage = function() {
    this.setState({showSearchPage: true});
  }

  hideSearchPage = function() {
    this.setState({showSearchPage: false});
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ?
          <Search
            hideSearchPage={this.hideSearchPage}
            onShelfChange={this.changeShelf}
            getCurrentShelf={this.getCurrentShelf}
          /> :
          <BookShelves
            showSearchPage = {this.showSearchPage}
            onShelfChange={this.changeShelf}
            books={this.state.books}
          />}
      </div>
    )
  }
}

export default BooksApp