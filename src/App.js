import React from 'react';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';

import './App.scss';

export default function App() {
  return (
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Layout>
    </div>
  );
}
