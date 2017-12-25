import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BreadNav from '../../common/BreadNav';
import Search from './Search';
import { articleQuery } from '../../../actions';

const processData = (data = []) => {
  const back = [];
  data.forEach((item) => {
    const {
      name,
      type,
      updateTime,
      _id: key,
    } = item;
    back.push({
      name,
      type,
      updateTime,
      key,
    });
  });
  return back;
};

const fetchData = (data = {}) => {
  const {
    name,
    type,
    status,
    date,
  } = data;
  const updateDateRange = [];
  if (date) {
    date.forEach((item) => {
      updateDateRange.push(item.valueOf());
    });
  }
  return {
    name,
    type,
    status,
    updateDateRange,
  };
};

class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.initConfig();
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  componentDidMount() {
    this.fetch({ current: 1, pageSize: 10 }, true);
  }

  fetch(data = { current: 1, pageSize: 10 }, isFirst = false) {
    this.props.onQuery(data, isFirst);
  }

  initConfig() {
    this.BreadNav = [
      {
        title: '文章管理',
      },
    ];
  }

  handleTableChange(pagination) {
    const { current, pageSize, queryVo } = pagination;
    this.fetch({
      queryVo,
      pageSize,
      current,
    });
  }

  handleFormChange(data) {
    const {
      pageSize,
    } = this.props;
    this.fetch({
      queryVo: JSON.stringify(fetchData(data)),
      pageSize,
      current: 1,
    });
  }

  render() {
    const {
      data, current, pageSize, total, isLoading,
    } = this.props;
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    }, {
      title: '类别',
      dataIndex: 'type',
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
    }, {
      title: '操作',
      render: () => <div><a>编辑</a> <a>删除</a></div>,
    }];
    // const data = [{
    //   key: '1',
    //   name: '文章1',
    //   releaseDate: 456461,
    //   type: 'New York No. 1 Lake Park',
    // }, {
    //   key: '2',
    //   name: '文章2',
    //   releaseDate: 456461,
    //   type: 'London No. 1 Lake Park',
    // }];

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
    };
    return (
      <div>
        <BreadNav config={this.BreadNav} />
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Search onSubmit={this.handleFormChange} />
          <div style={{ paddingBottom: '20px' }}>
            <Link to="/ArticleAddorEdit">
              <Button>新增文章</Button>
            </Link>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={processData(data)}
            pagination={{ current, pageSize, total }}
            loading={isLoading}
            onChange={this.handleTableChange}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onQuery: (values, isFirst) => dispatch(articleQuery(values, isFirst)),
});

const mapStateToProps = ({ articleList }) => ({
  ...articleList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleList);
