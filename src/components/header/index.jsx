import React from 'react';

// Styles
import './header.scss';

/**
 * This function is the Header component of the page
 */
export default function Header(props) {
  return (
    <header className='menu_header'>
      <span className='menu_header_brand'>Menu</span>
      <a href={props.anchorLink}>{props.anchorLabel}</a>
    </header>
  );
}