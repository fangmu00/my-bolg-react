import React from 'react';
import ReactDOM from 'react-dom';
import { Breadcrumb } from 'antd';

const BreadNav = ({ config }) => {
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        {
          config.map((item, i) => <Breadcrumb.Item key={ i }>{ item.title }</Breadcrumb.Item>)
        }
      </Breadcrumb>
    )
}

BreadNav.propTypes = { config: React.PropTypes.array };
BreadNav.defaultProps = { config: [] };

export default BreadNav;
