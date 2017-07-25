import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';
import ArticleList from './Article/ArticleList/index';
import ArticleAddorEdit from './Article/ArticleAddorEdit';
import Home from './Home';

const { Header, Sider } = Layout;

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultSelectKey: ['1']
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Layout style={{ height: '100vh' }}>
          <Header className="header">
            <div className="logo">
              {
                '我的博客'
              }
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px', display: 'inline-block' }}
            >
              <Menu.Item key="1">
                <NavLink to={ '/ArticleAddorEdit' } >
                  {'新增文章'}
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
            <Menu
              theme="dark"
              mode="horizontal"
              className={'user-info'}
              style={{ lineHeight: '64px', float: 'right' }}
            >
              <Menu.Item key="1">{'Hi~ Sun'}</Menu.Item>
              <Menu.Item key="2">{'退出'}</Menu.Item>
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
                    to={ '/' }
                  >
                    <span>
                      <Icon type="file" />
                      <span className="nav-text">概述</span>
                    </span>
                  </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink
                    to={ '/ArticleList' }
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
                <Route exact path="/" component={Home}  />
                <Route path="/ArticleList" component={ArticleList}  />
                <Route path="/ArticleAddorEdit" component={ArticleAddorEdit}  />
              </Switch>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default View
