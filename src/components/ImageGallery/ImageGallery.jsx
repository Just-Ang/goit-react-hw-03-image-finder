import { Component } from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    photo: [],
    totalPage: 0,
    modal: null,
    showModal: false,
    status: 'idle',
    page: 1,
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
    const prevSearchQuery = prevProps.photoName;
    const nextSearchQuery = this.props.photoName;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    const isNewSearchQuery = prevSearchQuery !== nextSearchQuery;

    if (isNewSearchQuery) {
      this.setState({ photo: [], page: 1 });
    }

    if (isNewSearchQuery || prevPage !== currentPage) {
      const requestPage = isNewSearchQuery ? 1 : currentPage;

      if (this.state.status === 'pending') return 

      this.setState({ status: 'pending' });

   
    
      fetch(
        `https://pixabay.com/api/?key=34821995-346cc43bb02fb642b37e66530&q=${nextSearchQuery}&image_type=photo&orientation=horizontal&per_page=12&page=${requestPage}`
      )
        .then(res => res.json())
        .then(photo => this.setState({
          photo: this.state.photo.concat(photo.hits),
          totalPage: photo.totalPage,
          status: 'resolved',
        }))
    
  }}

  render() {
    const { photo, status } = this.state;
    if (status === 'pending' && photo.length === 0) {
      return <Loader visible />;
    }

    if (status === 'idle') {
      return <h1
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>Enter a search query</h1>;
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
      <Button onClick={this.onBtnClick} />
     </div>
    );
  }
}
