
import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '..';

describe('Sidebar', () => {
  test('should render with success', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toMatchSnapshot();
  });
});
