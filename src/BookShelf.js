import React from 'react'
import Book from './Book'

class BookShelf extends React.Component {
  render() {
    const listItems = this.props.books.map(book => (
      <li key={book.id}>
        <Book book={book} onShelfChange={this.props.onShelfChange}/>
      </li>
    ));

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {listItems}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf