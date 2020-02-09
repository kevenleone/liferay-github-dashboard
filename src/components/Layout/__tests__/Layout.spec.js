
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import sagaMiddleware from 'redux-saga';
import configureMockStore from 'redux-mock-store';

import Layout from '../Layout';

const mockStore = configureMockStore([sagaMiddleware]);


describe('Layout', () => {
  test('should render with success', () => {
    const store = mockStore({
      github: {
        repositories: [],
        repository: {
          repo: '',
          formError: false,
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Layout>
          <div className="hey">
            <span>Hey Layout</span>
          </div>
        </Layout>
      </Provider>,
    );
    expect(wrapper.find('div.hey span').contains('Hey Layout')).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
