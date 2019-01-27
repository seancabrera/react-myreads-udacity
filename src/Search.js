import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResults: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const searchQuery = e.target.value;
    this.setState({value: searchQuery});
    if(searchQuery) {
      this.performSearch(searchQuery);
    } else {
      this.clearSearchResults();
    }
  }

  performSearch(searchQuery) {
    BooksAPI.search(searchQuery).then((results) => {
      if(results.error) {
        this.clearSearchResults();
        return;
      }

      this.updateSearchResults(results);
    });
  }

  clearSearchResults() {
    this.setState({searchResults: []});
  }

  updateSearchResults(results) {
    results = this.filterResultsWithThumbnails(results);
    results = this.getCurrentShelfForResults(results);
    this.setState({searchResults: results});
  }

  filterResultsWithThumbnails(results) {
    return results.filter(result => result.imageLinks && result.imageLinks.smallThumbnail);
  }

  getCurrentShelfForResults(results) {
    return results.map(result => {
      result.shelf = this.props.getCurrentShelf(result);
      return result;
    });
  }

  render() {
    const listItems = this.state.searchResults.map(book => (
      <li key={book.id}>
        <Book book={book} onShelfChange={this.props.onShelfChange}/>
      </li>
    ));

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.hideSearchPage}>Close</button>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{listItems}</ol>
        </div>
      </div>
    );
  }
}

export default Search