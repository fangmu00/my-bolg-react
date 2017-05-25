import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal } from 'antd';
import BreadNav from './common/BreadNav';

// import styles from './HelloWord.css';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.initConfig();
    }

    initConfig() {
      this.BreadNav = [
        {
          title: '概述'
        }
      ]
    }

    render() {
        return (
          <div>
              <BreadNav config={ this.BreadNav }/>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                Home
              </div>
          </div>
        )
    }
}

export default Home;
