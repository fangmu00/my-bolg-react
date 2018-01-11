import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, NavLink, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleList from './Article/ArticleList/index';
import ArticleAddorEdit from './Article/ArticleAddorEdit';
import Home from './Home';
import Login from './Login';
import ArticleDetail from './Article/ArticleDetail';
import { creator } from '../actions';

const { Header, Sider } = Layout;

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderView() {
    const { userInfo, loginOut } = this.props;
    const { username } = userInfo;
    return (
      <Layout style={{ height: '100vh' }}>
        <Header className="header">
          <div className="logo">
            {'我的博客'}
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            className="user-info"
            style={{ lineHeight: '64px', float: 'right' }}
          >
            <Menu.Item key="1">{username}</Menu.Item>
            <Menu.Item key="2">
              <div onClick={loginOut}>
                {'退出'}
              </div>
            </Menu.Item>
          </Menu>

        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%' }}
            >
              <Menu.Item key="1">
                <NavLink
                  to="/"
                >
                  <span>
                    <Icon type="file" />
                    <span className="nav-text">概述</span>
                  </span>
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">
                <NavLink
                  to="/ArticleList"
                >
                  <span>
                    <Icon type="file" />
                    <span className="nav-text">文章管理</span>
                  </span>
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/ArticleList" component={ArticleList} />
              <Route path="/ArticleEdit/:articleId" component={ArticleAddorEdit} />
              <Route path="/ArticleAdd" component={ArticleAddorEdit} />
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    );
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
                !isLogin ? (<Redirect to="/Login" />) : this.renderView()
              )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

View.defaultProps = {
  loginOut: () => {},
  userInfo: {},
  isLogin: false,
};

View.propTypes = {
  loginOut: PropTypes.func,
  userInfo: PropTypes.objectOf(PropTypes.any),
  isLogin: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  loginOut: () => dispatch(creator({ type: 'LOGIN_OUT' })),
});

const mapStateToProps = ({ userInfo }) => ({
  userInfo,
  isLogin: !!(userInfo.username),
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
