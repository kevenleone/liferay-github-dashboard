import React from 'react';
import Logo from '../../../assets/liferay.png';
import './Sidebar.scss';

export default function Sidebar() {
  return (
    <div className="Sidebar">
      <section>
        <div className="logo">
          <img
            alt="liferay-logo"
            src={Logo}
          />
        </div>
      </section>
    </div>
  );
}
