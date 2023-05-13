import { Component } from 'react';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    modal: null,
    showModal: false,
  };
  render() {
    return (
      <>
        {this.props.photos.map(({ id, webformatURL, largeImageURL }) => (
          <li
            className={css.ImageGalleryItem}
            onClick={evt => {
              this.setState({
                modal: largeImageURL,
              });
              this.props.onClick(largeImageURL);
              this.props.onClose();
            }}
            key={id}
          >
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt=""
            />
          </li>
        ))}
      </>
    );
  }
}
