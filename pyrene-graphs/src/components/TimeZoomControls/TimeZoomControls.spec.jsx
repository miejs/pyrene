import React from 'react';
import moment from 'moment';
import TimeZoomControls from './TimeZoomControls';

const props = {
  from: moment('2019-10-01 10:34').valueOf(),
  lowerBound: moment('2018-10-01 10:34').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: jest.fn(),
  to: moment('2019-10-07 10:34').valueOf(),
  upperBound: moment('2020-10-01 10:34').valueOf(),
  zoomInDisabled: false,
};

// When only 'from' hits lower bound
const props1 = {
  from: moment('2018-10-01 10:34').valueOf(),
  lowerBound: moment('2018-10-01 10:34').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => {},
  to: moment('2019-10-07 10:34').valueOf(),
  upperBound: moment('2020-10-01 10:34').valueOf(),
  zoomInDisabled: false,
};

// When only 'to' hits upper bound
const props2 = {
  from: moment('2018-10-07 10:34').valueOf(),
  lowerBound: moment('2018-10-01 10:34').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => {},
  to: moment('2020-10-01 10:34').valueOf(),
  upperBound: moment('2020-10-01 10:34').valueOf(),
  zoomInDisabled: false,
};

// When both 'from' and 'to' hit bounds
const props3 = {
  from: moment('2018-10-01 10:34').valueOf(),
  lowerBound: moment('2018-10-01 10:34').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: () => {},
  to: moment('2020-10-01 10:34').valueOf(),
  upperBound: moment('2020-10-01 10:34').valueOf(),
  zoomInDisabled: false,
};

// Bounds not hit but cannot zoom in
const props4 = {
  from: moment('2019-10-01 10:34').valueOf(),
  lowerBound: moment('2018-10-01 10:34').valueOf(),
  minZoomRange: moment.duration({ minutes: 30 }).valueOf(),
  onZoom: jest.fn(),
  to: moment('2019-10-07 10:34').valueOf(),
  upperBound: moment('2020-10-01 10:34').valueOf(),
  zoomInDisabled: true,
};

describe('<TimeZoomControls />', () => {
  it('renders without crashing', () => {
    shallow(<TimeZoomControls {...props} />);
  });

  it('renders its content', () => {
    const rendered = shallow(<TimeZoomControls {...props} />);
    expect(rendered.at(0).props().styling).toBe('shadow');
    expect(rendered.at(0).props().actions).toHaveLength(2);
    expect(rendered.at(0).prop('actions')[0].iconName).toBe('zoomOut');
    expect(rendered.at(0).prop('actions')[1].iconName).toBe('zoomIn');
  });

  it('executes zoom callback', () => {
    const rendered = mount(<TimeZoomControls {...props} />);
    const zoomInBtn = rendered.find('.pyreneIcon-zoomIn');
    const zoomOutBtn = rendered.find('.pyreneIcon-zoomOut');
    zoomInBtn.simulate('click');
    zoomOutBtn.simulate('click');
    expect(props.onZoom).toHaveBeenCalledTimes(2);
  });

  it('checks zoom bounds correctly', () => {
    const rendered1 = shallow(<TimeZoomControls {...props1} />);
    const rendered2 = shallow(<TimeZoomControls {...props2} />);
    const rendered3 = shallow(<TimeZoomControls {...props3} />);
    expect(rendered1.at(0).prop('actions')[1].active).toBe(true);
    expect(rendered2.at(0).prop('actions')[1].active).toBe(true);
    expect(rendered3.at(0).prop('actions')[0].active).toBe(false);
  });

  it('has correct zoom-in status for zoom-in button', () => {
    const rendered = shallow(<TimeZoomControls {...props4} />);
    expect(rendered.at(0).prop('actions')[0].active).toBe(true);
    expect(rendered.at(0).prop('actions')[1].active).toBe(false);
  });
});
