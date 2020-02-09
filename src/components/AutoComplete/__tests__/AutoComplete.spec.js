import React from 'react';
import { shallow } from 'enzyme';

import AutoComplete from '..';

describe('AutoComplete', () => {
  test('should render with success', () => {
    const wrapper = shallow(
      <AutoComplete
        onChange={(e) => e.target.value}
        onClickItem={(e) => e}
        name="repositories"
        itemSelected="clay"
        value="clay"
        data={[]}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
