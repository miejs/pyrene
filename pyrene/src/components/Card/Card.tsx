import React, { ReactNode, FunctionComponent } from 'react';
import clsx from 'clsx';

import Loader from '../Loader/Loader';
import Banner from '../Banner/Banner';
import styles from './Card.module.css';

export interface CardProps {
  /**
   The content enclosed in the card.
   */
  children: ReactNode,
  /**
   * An error to be shown rather than the content.
   */
  error?: string,
  /**
   * An optional footer component.
   */
  footer?: ReactNode,
  /**
    * An optional header component, e.g., a time range selector.
    */
  header?: ReactNode,
  /**
   * Indicates whether the card is loading. Displays an overlay loader.
   */
  loading?: boolean,
  /**
   * Sets spacing between card content and edge
   */
  paddingSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge',
}

/**
 * Cards are containers for content.
 *
 * They take the full width of the enclosing box and the height they need to fit the content.
*/
const Card: FunctionComponent<CardProps> = ({
  header,
  footer,
  children,
  loading = false,
  error,
  paddingSize = 'large',
}: CardProps) => (
  <div className={clsx(styles.container, styles[paddingSize])}>
    {header && <div className={styles.header}>{header}</div>}
    <div className={clsx(styles.content, {
      [styles['content--noHeader']]: !header,
      [styles['content--noFooter']]: !footer,
    })}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {error ? <div className={styles.error}><Banner type="error" styling="standard" label={error} /></div>
        : loading ? (
          <div className={styles.loader}>
            <div className={styles.loadingOverlay}>
              <Loader size="large" />
            </div>
          </div>
        ) : children}
    </div>
    {footer && <div className={styles.footer}>{footer}</div>}
  </div>
);

Card.displayName = 'Card';

export default Card;
