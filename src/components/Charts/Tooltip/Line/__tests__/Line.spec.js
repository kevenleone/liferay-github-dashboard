
import React from 'react';
import { shallow } from 'enzyme';
import Line from '../Line';

describe('Text', () => {
  test.skip('should render with success', () => {
    const props = {
      active: true,
      payload: [{
        payload: {
          name: 'Medium',
          'Average Time': 0,
          'Pull Requests': 0,
        },
      }],
    };
    const wrapper = shallow(<Line {...props} />);
    expect(wrapper.find('div.custom-tooltip td').contains('Average Time')).toBeTruthy();
    expect(wrapper.find('div.custom-tooltip td').contains('Pull Requests')).toBeTruthy();
    expect(wrapper.find('div.custom-tooltip td').contains('Medium')).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  test.skip('should render null', () => {
    const props = {
      active: false,
    };
    const wrapper = shallow(<Line {...props} />);
    expect(wrapper.equals(null)).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
