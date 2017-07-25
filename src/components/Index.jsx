import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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
        <div>
          <Route path="/Login" component={Login}  />
          <Route exact path="/" component={View}  />
        </div>

      </BrowserRouter>
    )
  }
}

export default Index
