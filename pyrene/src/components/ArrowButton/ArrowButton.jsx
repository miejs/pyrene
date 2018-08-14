import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './arrowbutton.css';

/**
 * Buttons are used primarily on action items and to communicate what action the user can take.
 * They are placed throughout the UI and can be found in places like forms, modals, dialogues etc.
 * Do not use Buttons as navigational elements.
 * Instead, use Links because it takes the user to a new page and is not associated with an action.
 */
const ArrowButton = props => {
  const capitalisedDirection = props.direction.charAt(0).toUpperCase() + props.direction.slice(1);
  const iconName = `icon-chevron${capitalisedDirection}`;
  return (
    <button
      className={'unSelectable'}
      styleName={
        classNames('arrowButton',
          {disabled: props.disabled},
          {[`type-${props.type}`]: true})}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className={iconName} styleName={'icon'} />
    </button>
  );
}

ArrowButton.displayName = 'Arrow Button';

ArrowButton.defaultProps = {
  direction: 'right',
  type: 'bordered',
  disabled: false,
  onClick: () => null,
};

ArrowButton.propTypes = {
  /**
   * Sets the direction of the arrow.
   */
  direction: PropTypes.oneOf(['up', 'down', 'right', 'left']),
  /**
   * Disables any interaction with the component.
   */
  disabled: PropTypes.bool,
  /**
   * Javascript event handler.
   */
  onClick: PropTypes.func,
  /**
   * Sets the overall style.
   */
  type: PropTypes.oneOf(['bordered', 'minimal']),
};

export default ArrowButton;
