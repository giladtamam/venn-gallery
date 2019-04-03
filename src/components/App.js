import React, { Component } from 'react';
import debounce from 'debounce';
import PropTypes from 'prop-types';
import './App.css'

class App extends Component {
  static propTypes = {
    photos: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    fetchImages: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.fetchImages();
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.photos.length
    ) {
      const { searchTerm } = this.props;
      this.props.fetchImages({ loadMore: true, searchTerm });
    }
  }

  setSearchTerm = debounce(searchTerm => {
    this.props.fetchImages({ searchTerm });
  }, 1000)

  handleChange = (event) => {
    const term = event.target.value;
    this.setSearchTerm(term);
  }

  render() {
    const { photos } = this.props;
    return (
      <div> 
        <div className="header">
          <span className="header-text">Image Gallery</span>
          <input
            placeholder="search for images..."
            type="text"
            onChange={this.handleChange}
            className="search-input"
          />
        </div>
        <div className="photos-container">
          { photos.map(photo => {
            return <img title={photo.title} alt={photo.title} key={photo.id} className="flicker-image" width="250px" height="250px" src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
          })}
        </div>
      </div>
    );
  }
}

export default App
