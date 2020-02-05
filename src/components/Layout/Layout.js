import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';

import './Layout.scss';

export default function Layout({ children }) {
  return (
    <div className="Layout">
      <Header />
      <Sidebar />
      <main className="content">
        { children }
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
