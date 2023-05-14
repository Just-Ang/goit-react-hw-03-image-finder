import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    image: null,
  };
  

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.value} alt="" />
        </div>
      </div>
    );
  }
}
