import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './Sidebar';

import './Layout.scss';

export default function Index({ children }) {
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

Index.propTypes = {
  children: PropTypes.node.isRequired,
};
