/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import addMilliseconds from 'date-fns/addMilliseconds';
import subMilliseconds from 'date-fns/subMilliseconds';
import getTime from 'date-fns/getTime';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import clsx from 'clsx';
import PresetTimeRanges, { PresetTimeRangesProps } from './PresetTimeRanges/PresetTimeRanges';
import TimeRangeNavigationBar from './TimeRangeNavigationBar/TimeRangeNavigationBar';
import PRESET_TIME_RANGES, { TimeRange } from './TimeRangeSelectorDefaultProps';
import styles from './timeRangeSelector.css';

export interface TimeRangeSelectorProps {
  /**
   * Whether or not the component is disabled
   * Type: boolean
   */
  disabled?: boolean,
  /**
   * The start value of the range in epoch milliseconds
   * Type: number (required)
   */
  from: number,
  /**
   * The oldest queryable starting time point, in epoch milliseconds
   * Type: number (required)
   */
  lowerBound: number,
  /**
   * Callback function passed by parent page (usually a GET request to fetch new data)
   * Type: function(from: number, to: number) (required)
   */
  onChange: (from: number, to: number) => void,
  /**
   * The preset time ranges to display as preset buttons
   * Type: [{ id: string (required) the id of the preset, label: string (required) label of the preset button displayed to the user, durationInMs: number (required) the duration of the timerange in epoch ms }]
   */
  presetTimeRanges?: Array<TimeRange>,
  /**
   * Function called if there is some element to be rendered on the rightmost side
   * Type: function
   */
  renderRightSection?: () => JSX.Element,
  /**
   * The timezone that the range selector should use to display the time
   * Type: string (required)
   */
  timezone: string,
  /**
   * The end value of the range to in epoch milliseconds
   * Type: number (required)
   */
  to: number,
  /**
   * The latest queryable ending time point, in epoch milliseconds
   * Type: number
   */
  upperBound: number,
}

interface TimeRangeSelectorState {
  durationInMs: number,
  preserveDuration: boolean,
}

/**
 * TimeRangeSelectors are used to provide a certain timerange within a lower and upper limit and change it via timesteps.
 *
 * Default time ranges are defined as follows:
 * 24 hours
 * 7 days
 * 30 days
 * 1 year
 */
export default class TimeRangeSelector extends Component<TimeRangeSelectorProps, TimeRangeSelectorState> {

  static displayName = 'Time Range Selector';

  static defaultProps = {
    disabled: false,
    presetTimeRanges: PRESET_TIME_RANGES,
    renderRightSection: (): void => {},
  };

  constructor(props: TimeRangeSelectorProps) {
    super(props);

    const durationInMs = (props.to - props.from) - ((props.to - props.from) % 10); // calculate the duration of the timerange minus rounding errors

    this.state = {
      durationInMs,
      preserveDuration: false,
    };
  }

  static getDerivedStateFromProps(props: TimeRangeSelectorProps, state: TimeRangeSelectorState): Partial<TimeRangeSelectorState> | null {
    if (props.to - props.from !== state.durationInMs && !state.preserveDuration) {
      const newDuration = (props.to - props.from) - ((props.to - props.from) % 10);
      return { durationInMs: newDuration };
    }
    if (state.preserveDuration) {
      return { preserveDuration: false };
    }
    return null;
  }

  /**
   * Updates the from/to limits, the upperbound and the current preset settings when a preset is selected
   * @param newFrom                 the new from value in epoch milliseconds
   * @param newTo                   the new to value in epoch milliseconds
   * @param newUpperBound           the new value of the upperbound synced accordingly
   * @param durationInMs            the duration of the timerange based on the selected preset
   * @param presetId                the id of the preset
   * @private
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onPresetTimeRangeSelected: PresetTimeRangesProps['onInteract'] = (newFrom, newTo, newUpperBound, durationInMs, presetId) => {
    this.setState({
      durationInMs, // We need to store it, otherwise if we reach the lower/upper bound we will start to use less milliseconds with the steppers
    },
    () => {
      this.props.onChange(newFrom, newTo);
    });
  };

  _onNavigateBack = (): void => {
    const fromDiff = subMilliseconds(this.props.from, this.state.durationInMs);
    const toDiff = subMilliseconds(this.props.to, this.state.durationInMs);

    const newFrom = Math.max(getTime(fromDiff), this.props.lowerBound);

    // Keep the selected timespan duration if we reach a bound
    const newTo = differenceInMilliseconds(toDiff, newFrom) < this.state.durationInMs
      ? addMilliseconds(newFrom, this.state.durationInMs)
      : toDiff;
    return this.props.onChange(newFrom, Math.min(getTime(newTo), this.props.upperBound));
  };

  _onNavigateForward = (): void => {
    const fromDiff = addMilliseconds(this.props.from, this.state.durationInMs);
    const toDiff = addMilliseconds(this.props.to, this.state.durationInMs);

    const newTo = Math.min(getTime(toDiff), this.props.upperBound);

    // Keep the selected timespan duration if we reach a bound
    const newFrom = differenceInMilliseconds(newTo, fromDiff) < this.state.durationInMs
      ? addMilliseconds(newTo, this.state.durationInMs)
      : fromDiff;
    return this.props.onChange(Math.max(getTime(newFrom), this.props.lowerBound), newTo);
  };

  /**
   * Checks whether the component has a preset timerange selected when navigating; if yes, we should preserve the current durationInMs.
   * @private
   */
  _preserveDurationForNavigation = (navigateCallback: () => void): void => {
    const foundTimeRangeType = this.props?.presetTimeRanges?.find?.((preset) => preset.durationInMs === this.state.durationInMs);
    if (foundTimeRangeType) {
      this.setState({ preserveDuration: true }, () => {
        navigateCallback();
      });
    } else {
      navigateCallback();
    }
  };

  render(): JSX.Element {
    const currentTimeRangeType = this.props?.presetTimeRanges?.find?.((preset) => preset.durationInMs === this.state.durationInMs); // Try to find if the timerange matches an initial preset
    const timeRangeId = currentTimeRangeType ? currentTimeRangeType.id : ''; // If we found a match, then let's use the id of the preset, otherwise no default preset has to be selected

    return (
      <div className={clsx(styles.timeRangeSelector, { [styles.disabled]: this.props.disabled })}>
        <div className={styles['timeRangeSelector--left']}>
          <PresetTimeRanges
            disabled={this.props.disabled}
            lowerBound={this.props.lowerBound}
            onInteract={this._onPresetTimeRangeSelected}
            currentTimeRangeType={timeRangeId}
            presetTimeRanges={this.props?.presetTimeRanges || []}
            upperBound={this.props.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div className={styles['timeRangeSelector--center']}>
          <TimeRangeNavigationBar
            disabled={this.props.disabled}
            to={this.props.to}
            from={this.props.from}
            lowerBound={this.props.lowerBound}
            onNavigateBack={() => this._preserveDurationForNavigation(this._onNavigateBack)}
            onNavigateForward={() => this._preserveDurationForNavigation(this._onNavigateForward)}
            upperBound={this.props.upperBound}
            timezone={this.props.timezone}
          />
        </div>
        <div className={clsx(styles['timeRangeSelector--right'], { [styles.disabled]: this.props.disabled })}>
          {this.props?.renderRightSection?.()}
        </div>
      </div>
    );
  }

}
