import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Route, Switch, NavLink, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ArticleList from './Article/ArticleList/index';
import ArticleAddorEdit from './Article/ArticleAddorEdit';
import Home from './Home';
import { creator } from '../actions';

const { Header, Sider } = Layout;

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { userInfo, loginOut } = this.props;
    const { username } = userInfo;
    return (
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <Header className="header">
            <div className="logo">
              {'我的博客'}
            </div>
            {/* <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px', display: 'inline-block' }}
          >
            <Menu.Item key="1">
              <NavLink to="/ArticleAddorEdit" >
                {'新增文章'}
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu> */}
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
      </BrowserRouter>
    );
  }
}

View.defaultProps = {
  loginOut: () => {},
  userInfo: {},
};

View.propTypes = {
  loginOut: PropTypes.func,
  userInfo: PropTypes.objectOf(PropTypes.any),
};

const mapDispatchToProps = dispatch => ({
  loginOut: () => dispatch(creator({ type: 'LOGIN_OUT' })),
});

const mapStateToProps = ({ userInfo }) => ({
  userInfo,
});

export default connect(mapStateToProps, mapDispatchToProps)(View);
