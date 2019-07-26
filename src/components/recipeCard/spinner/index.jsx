import React from 'react';

// Styles
import './spinner.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Spinner() {
  return (
    <div className='menu_spinner'>
      <FontAwesomeIcon icon={faSpinner} spin />
    </div>
  );
}