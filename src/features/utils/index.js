import PropTypes from 'prop-types';
import React from 'react';

export function Rupee({ children }) {
  return <span>₹ {children}</span>;
}

Rupee.propTypes = {
  children: PropTypes.any,
};