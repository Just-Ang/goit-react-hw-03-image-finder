import React, { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    photos: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    const item = form.elements.text.value;

    if (item.trim() === '') {
      return alert('Enter a search query');
    }
    this.props.onSubmit(item);

    form.reset();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css.SearchFormButton} type="submit">
            <span>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};