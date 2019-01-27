import React from 'react'
import BookShelf from './BookShelf'

class BookShelves extends React.Component {

  render() {
    const currentlyReadingBooks = this.props.books.filter((book) => book.shelf === 'currentlyReading');
    const wantToReadBooks = this.props.books.filter((book) => book.shelf === 'wantToRead');
    const readBooks = this.props.books.filter((book) => book.shelf === 'read');

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently Reading" books={currentlyReadingBooks} onShelfChange={this.props.onShelfChange} />
            <BookShelf title="Want to Read" books={wantToReadBooks} onShelfChange={this.props.onShelfChange}/>
            <BookShelf title="Read" books={readBooks} onShelfChange={this.props.onShelfChange}/>
          </div>
        </div>
        <div className="open-search">
          <button onClick={this.props.showSearchPage}>Add a book</button>
        </div>
      </div>
    )
  }
}

export default BookShelves