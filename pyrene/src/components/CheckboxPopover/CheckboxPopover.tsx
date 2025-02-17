import React, { FunctionComponent, useState } from 'react';
import clsx from 'clsx';

import Popover from '../Popover/Popover';
import CheckboxList, { CheckboxListProps } from './CheckboxList';
import styles from './checkboxPopover.css';

export interface CheckboxPopoverProps {
  buttonLabel: string;
  disabled?: boolean;
  listItems: CheckboxListProps['listItems'];
  onItemClick: CheckboxListProps['onItemClick'];
  onRestoreDefault: CheckboxListProps['onRestoreDefault'];
}

const CheckboxPopover: FunctionComponent<CheckboxPopoverProps> = ({
  onRestoreDefault,
  listItems,
  onItemClick,
  buttonLabel,
  disabled = false,
}: CheckboxPopoverProps) => {
  const [displayPopover, setDisplayPopover] = useState(false);

  const togglePopover = () => setDisplayPopover((prevDisplayPopover) => !prevDisplayPopover);

  return (
    <div className={clsx(styles.checkboxPopover, { [styles.disabled]: disabled })}>
      <Popover
        preferredPosition={['bottom']}
        align="end"
        displayPopover={displayPopover}
        distanceToTarget={8}
        onClickOutside={() => setDisplayPopover(false)}
        renderPopoverContent={() => (
          <CheckboxList
            listItems={listItems}
            onItemClick={onItemClick}
            onRestoreDefault={onRestoreDefault}
          />
        )}
      >
        <div
          className={clsx(styles.popoverTriggerButton, { [styles.popoverOpen]: displayPopover })}
          onClick={togglePopover}
        >
          <div className={clsx(styles.buttonLabel, 'unSelectable')}>
            {buttonLabel}
          </div>
          <div
            className={clsx(styles.arrowIcon, {
              'pyreneIcon-chevronUp': displayPopover,
              'pyreneIcon-chevronDown': !displayPopover,
            })}
          />
        </div>
      </Popover>
    </div>
  );
};

CheckboxPopover.displayName = 'CheckboxPopover';

export default CheckboxPopover;
