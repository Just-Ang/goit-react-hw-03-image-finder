import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    photo: [],
    modal: null,
    showModal: false,
    status: 'idle',
    page: 1,
    error: null,
    totalPage: null,
  };

  handleModal = value => {
    this.setState({ modal: value });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onBtnClick = () => {
    const { page } = this.state;
    this.setState({
      page: page + 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const isNewSearchQuery = prevProps.photoName !== this.props.photoName;

    if (isNewSearchQuery) {
      this.setState({ photo: [], page: 1 });
    }

    if (isNewSearchQuery || prevState.page !== this.state.page) {
      const requestPage = isNewSearchQuery ? 1 : this.state.page;

      if (this.state.status === 'pending') return;

      this.setState({ status: 'pending' });

      fetch(
        `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${this.props.photoName}&image_type=photo&orientation=horizontal&per_page=12&page=${requestPage}`
      )
        .then(res => res.json())
        .then(photo => {
          // console.log(photo)
          if (photo.hits.length === 0) {
            return this.setState({ status: 'rejected' });
          }
          this.setState({
            photo: this.state.photo.concat(photo.hits),
            totalPage: Math.ceil(photo.totalHits / 12),
            status: 'resolved',
          });
        });
    }
  }

  render() {
    const { photo, status } = this.state;
    if (status === 'pending' && photo.length === 0) {
      return <Loader visible />;
    }

    if (status === 'idle') {
      return (
        <h1
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Enter a search query
        </h1>
      );
    }
    if (status === 'rejected') {
      return <h1 style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>Not found</h1>;
    }
    return (
      <div>
        <div className={css.ImageGallery}>
          <ImageGalleryItem
            photos={photo}
            onClick={this.handleModal}
            onClose={this.toggleModal}
          />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal} value={this.state.modal}></Modal>
          )}
        </div>
        {this.state.page < this.state.totalPage && (
          <Button onClick={this.onBtnClick} />
        )}
      </div>
    );
  }
}
