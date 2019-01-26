import React from 'react'

class BookShelfChanger extends React.Component {
  render() {
    const value = this.props.value || 'none';

    return (
      <div className="book-shelf-changer">
        <select value={value} onChange={this.props.onShelfChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
      );
    }
  }

  export default BookShelfChanger