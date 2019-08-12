import React from 'react';
import {Link} from 'react-router-dom';

// Styles
import './header.scss';

/**
 * This function is the Header component of the page
 */
export default function Header(props) {
  
  /**
   * This method will render each item that header will receive as props
   * the rendered component is a Link from react-router-dom
   * 
   * @param {Object} value 
   * @param {Number} key
   * 
   * @return React Component
   */
  const renderAnchorItems = (value, key) => {
    return <Link key={key} to={value.path}>{value.label}</Link>;
  }

  return (
    <header className='menu_header'>
      <span className='menu_header_brand'>Menu</span>
      <div className='menu_header_anchorWrapper'>
        {props.anchorItems.map(renderAnchorItems)}
      </div>
    </header>
  );
}