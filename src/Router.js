import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './containers/Home';
import Users from './containers/Users';
import NotFound from './containers/NotFound';
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/users' exact component={Users} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </BrowserRouter>
  );
}
