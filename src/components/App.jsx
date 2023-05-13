import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React, { Component } from 'react';

export class App extends Component {
  state = {
    photoName: null,
    showModal: false,
  };

  componentDidUpdate(prevState) {
    if (this.state.photoName !== prevState.photoName) {
      console.log('change');
    }
  }

  handleFormSumit = value => {
    this.setState({ photoName: value });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: 16,
          paddingBottom: 24,
        }}
      >
        <Searchbar onSubmit={this.handleFormSumit} />
        <ImageGallery photoName={this.state.photoName} />
      </div>
    );
  }
}
