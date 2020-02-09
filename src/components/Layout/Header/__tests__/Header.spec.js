import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';

import Header from '..';

const mockStore = configureMockStore([sagaMiddleware]);

describe('Home', () => {
  test('should render with success', () => {
    const store = mockStore({
      github: {
        repositories: [],
        repository: {
          repo: 'clay',
          formError: false,
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(wrapper.find('input[name="username"]').props().value).toStrictEqual('');
    expect(wrapper.find('input[name="repository"]').props().value).toStrictEqual('clay');
    expect(wrapper).toMatchSnapshot();
  });
});
