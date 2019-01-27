import React from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends React.Component {
  render() {
    const authors = this.props.book.authors ?
      this.props.book.authors.join(', ') :
      '';

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}></div>
          <BookShelfChanger value={this.props.book.shelf} onShelfChange={(e) => this.props.onShelfChange(this.props.book, e.target.value)} />
        </div>
        <div className="book-title">{this.props.book.title} Test</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book