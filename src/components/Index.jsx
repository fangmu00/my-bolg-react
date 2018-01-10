import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import View from './View';
import ArticleDetail from './Article/ArticleDetail';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { isLogin } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            path="/Login"
            render={() => (
              isLogin ? (<Redirect to="/" />) :
              (<Login />)
            )}
          />
          <Route path="/ArticleDetail/:id" component={ArticleDetail} />
          <Route
            path="/"
            render={() => (
                !isLogin ? (<Redirect to="/Login" />) :
                (<View />)
              )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

Index.defaultProps = {
  isLogin: false,
};

Index.propTypes = {
  isLogin: PropTypes.bool,
};

const mapStateToProps = ({ userInfo }) => ({
  isLogin: !!(userInfo.username),
});

export default connect(mapStateToProps)(Index);
