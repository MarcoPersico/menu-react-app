import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './header.scss';

/**
 * This function is the Header component of the page
 */
export default function Header(props) {

  const RenderAnchorItems = (value) => {
    return <Link to={value.path}>{value.label}</Link>;
  }

  return (
    <header className='menu_header'>
      <span className='menu_header_brand'>Menu</span>
      <div className='menu_header_anchorWrapper'>
        {props.anchorItems.map(RenderAnchorItems)}
      </div>
    </header>
  );
}