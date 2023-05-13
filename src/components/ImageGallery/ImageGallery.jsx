import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from  './ImageGallery.module.css';



export class ImageGallery extends Component {
  state = {
    photo: [],
  };
  componentDidUpdate(prevProps) {
    if (prevProps.photoName !== this.props.photoName) {
      // console.log('izm');
      console.log(this.props.photoName);
      fetch(
        `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${this.props.photoName}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=1`
      )
        .then(res => res.json())
        .then(photo => this.setState({ photo: photo.hits }));
    }
  }

  render() {
    const { photo } = this.state;
    return (
      <div className={css.ImageGallery}> 
        <ImageGalleryItem photos={photo} />
      </div>
    );
  }
}
