import React from 'react';
import PropTypes from 'prop-types';

import CalendarDateSelectorBar from './CalendarDateSelectorBar';
import CalendarDateSelectorDropdown from './CalendarDateSelectorDropdown';
import CalendarDateSelectorPropTypes from './CalendarDateSelectorPropTypes';
import {
  DATE_TYPES,
  getCurrentDate,
  handleDateChange,
} from './CalendarDateSelectorUtils';

import './calendarDateSelector.css';

/**
 * Component for selecting a timeUnit and a range forwards and backwards.
 *
 * 'onChange({ year: number, month: number | undefined, day: number | undefined })' callback function can be registered via props, to handle range changes.
 *
 * Time units are defined as follows:
 * 1. Year - { year }
 * 2. Month - { year, month }
 * 3. Day - { year, month, day }
 */
export default class CalendarDateSelector extends React.Component {

  static DEFAULT_TIME_UNITS = [
    DATE_TYPES.DAY,
    DATE_TYPES.MONTH,
    DATE_TYPES.YEAR,
  ];

  static DEFAULT_LOWER_BOUND = {
    year: 2015,
    month: 1,
    day: 1,
  };

  static defaultProps = {
    isLoading: false,
    lowerBound: CalendarDateSelector.DEFAULT_LOWER_BOUND,
    upperBound: getCurrentDate(),
    timeUnits: CalendarDateSelector.DEFAULT_TIME_UNITS,
    // get current date, but set day as undefined
    value: {
      ...getCurrentDate(),
    },
    onChange: () => {},
    renderRightSection: () => {},
  };

  constructor(props) {
    super(props);
    const defaultTimeRange = props.timeUnits === CalendarDateSelector.DEFAULT_TIME_UNITS ? 1 : 0;
    this.state = {
      type: props.timeUnits[defaultTimeRange],
    };
  }

  _onNavigate = (value, direction) => {
    const { onChange } = this.props;
    const newDate = handleDateChange(value, direction, this.state.type);
    onChange(newDate);
  };

  _onSelect = (timeUnit) => {
    this.setState({ type: timeUnit });
  };

  render() {
    const {
      isLoading,
      timeUnits,
      lowerBound,
      upperBound,
      value,
      renderRightSection,
    } = this.props;

    const type = this.state.type;

    return (
      <div styleName="timeUnitSelector">
        <div styleName="timeUnitSelector--left">
          <div styleName="timeUnitSelector__dropdown">
            <CalendarDateSelectorDropdown
              timeUnits={timeUnits}
              timeUnit={type}
              onSelect={this._onSelect}
              disabled={isLoading}
            />
          </div>
        </div>
        <div styleName="timeUnitSelector--center">
          <CalendarDateSelectorBar
            value={value}
            timeUnit={type}
            lowerBound={lowerBound}
            upperBound={upperBound}
            onChange={this._onNavigate}
            disabled={isLoading}
          />
        </div>
        <div styleName="timeUnitSelector--right">
          {renderRightSection()}
        </div>
      </div>
    );
  }

}

CalendarDateSelector.displayName = 'Calendar Date Selector';

CalendarDateSelector.propTypes = {
  isLoading: PropTypes.bool,
  lowerBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  onChange: PropTypes.func,
  renderRightSection: PropTypes.func,
  timeUnits: CalendarDateSelectorPropTypes.TIMEUNIT_OPTIONS,
  upperBound: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
  value: CalendarDateSelectorPropTypes.YEAR_MONTH_DAY,
};
