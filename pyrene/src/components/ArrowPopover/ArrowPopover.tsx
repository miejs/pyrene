import React, { useEffect, useRef, useCallback } from 'react';
import { Position } from 'react-tiny-popover';
import Popover, { PopoverProps } from '../Popover/Popover';

import styles from './arrowPopover.css';

interface ArrowPosition {
  top: number,
  left: number,
  lengthSide: number,
}

type TargetRect = Omit<DOMRect, 'x' | 'y' | 'toJSON'>;

export interface ArrowPopoverProps {
  /**
   * Sets the alignment of the popover.
   */
  align?: PopoverProps['align'],
  /**
   * Action element
   */
  children: React.ReactElement,
  /**
   * Function to close the popover.
   */
  closePopover?: () => void,
  /**
   * Whether to display the popover.
   */
  displayPopover: PopoverProps['displayPopover'],
  /**
   * Sets the distance of the popover to its target.
   */
  distanceToTarget?: PopoverProps['distanceToTarget'],
  /**
   * Content rendered in popover
   */
  popoverContent: React.ReactNode,
  /**
   * Sets the preferred position array ordered by priority for auto repositioning.
   */
  preferredPosition?: Array<Position>,
}

export const arrowPosition = (position: Position, targetRect: TargetRect, popoverRect: TargetRect): ArrowPosition => {
  // Square
  const lengthSide = 20;
  const arrowWidth = (lengthSide * Math.sqrt(2)) / 2;

  // Bounding Rect

  // https://media.prod.mdn.mozit.cloud/attachments/2017/06/07/15087/8f54d3ea8e5ad0a1f12ddc185fb78052/rect.png
  let top = targetRect.top - popoverRect.top + (targetRect.height / 2) - (lengthSide / 2);
  let left = targetRect.left - popoverRect.left + (targetRect.width / 2) - (lengthSide / 2);

  const heightOverflowPoint = popoverRect.height - arrowWidth;
  const widthOverflowPoint = popoverRect.width - arrowWidth;
  // Do not let arrow overflow
  switch (position) {
    case 'top':
      top = heightOverflowPoint;
      left = left + arrowWidth > widthOverflowPoint ? widthOverflowPoint - arrowWidth : left;
      left = left < arrowWidth ? arrowWidth : left;
      break;
    case 'left':
      left = widthOverflowPoint;
      top = top + arrowWidth > heightOverflowPoint ? heightOverflowPoint - arrowWidth : top;
      top = top < arrowWidth ? arrowWidth : top;
      break;
    case 'bottom':
      top = -lengthSide / 2;
      left = left + arrowWidth > widthOverflowPoint ? widthOverflowPoint - arrowWidth : left;
      left = left < arrowWidth ? arrowWidth : left;
      break;
    // right
    default:
      left = -lengthSide / 2;
      top = top + arrowWidth > heightOverflowPoint ? heightOverflowPoint - arrowWidth : top;
      top = top < arrowWidth ? arrowWidth : top;
  }
  return { top, left, lengthSide };
};

/**
 *  Popover with Arrow
 */
const ArrowPopover: React.FC<ArrowPopoverProps> = ({
  children,
  popoverContent,
  displayPopover,
  closePopover,
  preferredPosition = ['top', 'left'],
  align = 'center',
  distanceToTarget = 20,
}: ArrowPopoverProps) => {

  const node = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback((e: MouseEvent) => {
    if (closePopover && node && node.current && !node.current.contains(e.target as Node)) {
      closePopover();
    }
  }, [closePopover, node]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return (
    <Popover
      align={align}
      distanceToTarget={distanceToTarget}
      preferredPosition={preferredPosition}
      renderPopoverContent={(position, nudgedLeft, nudgedTop, targetRect, popoverRect) => {

        const { top, left, lengthSide } = arrowPosition(position, targetRect, popoverRect);

        return (
          <div className={styles.popover} ref={node}>
            <div className={styles.popoverContent}>{popoverContent}</div>
            <div
              className={styles.triangle}
              style={{
                left,
                top,
                width: lengthSide,
                height: lengthSide,
              }}
            />
          </div>
        );
      }}
      displayPopover={displayPopover}
      autoReposition
    >
      {children}
    </Popover>
  );
};

ArrowPopover.displayName = 'ArrowPopover';

export default ArrowPopover;
