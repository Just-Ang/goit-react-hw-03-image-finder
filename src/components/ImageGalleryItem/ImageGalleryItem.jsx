// import { Component } from 'react';
import css from  './ImageGalleryItem.module.css';

export const ImageGalleryItem =({photos}) => {
    return (<>
    
    {photos.map(({ id, webformatURL }) => (
      <li className={css.ImageGalleryItem} key={id}>
        <img className={css.ImageGalleryItemImage } src={webformatURL} alt="" />
      </li>
    ))}
        </>)
    }