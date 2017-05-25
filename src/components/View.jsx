import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter, Route, Router, NavLink } from 'react-router-dom';
import ArticleList from './Article/ArticleList';
import Home from './Home';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

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
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
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
              <Route exact path="/" component={Home}/>
              <Route path="/ArticleList" component={ArticleList}/>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
      )
  }
}

export default View
