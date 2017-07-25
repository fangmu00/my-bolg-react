import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import View from './View';


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Login" component={Login}  />
          <Route path="/" component={View}  />
        </Switch>

      </BrowserRouter>
    )
  }
}

export default Index
