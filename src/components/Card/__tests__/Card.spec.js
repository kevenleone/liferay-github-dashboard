import React from 'react';
import { mount } from 'enzyme';
import Card from '..';

describe('Card', () => {
  test('should render with success', () => {
    const wrapper = mount(
      <Card title="Hey">
        <div>Oi</div>
      </Card>,
    );
    expect(wrapper.find('div.card-title').contains('Hey')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
