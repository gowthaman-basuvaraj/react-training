import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export function AgeDisplay({ age, underAged }) {
  let className = classNames({
    'text-red-500': underAged,
  });

  return <span className={className}>
      {underAged && <span className={'text-red-600 mr-2'}><FontAwesomeIcon icon={faExclamationTriangle} /></span>}{age}
    </span>;
}

AgeDisplay.propTypes = {
  age: PropTypes.any,
  underAged: PropTypes.any,
};