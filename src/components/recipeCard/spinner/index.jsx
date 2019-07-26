import React from 'react';

// Styles
import './spinner.scss';

// Font Awesome import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

/**
 * This function is the Spinner component
 */
export default function Spinner() {
  return (
    <div className='menu_spinner'>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}