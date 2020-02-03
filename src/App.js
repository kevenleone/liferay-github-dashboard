import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';

import './App.scss';

export default function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
}
