import React from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate } from '../../../app/uilts';
import BreadNav from '../../common/BreadNav';
import Search from './Search';
import { articleQuery, creatorAsync } from '../../../actions';

const processData = (data = []) => {
  const back = [];
  data.forEach((item) => {
    const {
      name,
      type,
      updateTime,
      status,
      _id: key,
    } = item;
    back.push({
      name,
      type,
      updateTime,
      status,
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
    this.handleTableChange = this.handleTableChange.bind(this);
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

  removeArticle(id) {
    const { current, pageSize, queryVo } = this.props;
    this.props.removeArticle(id, {
      queryVo,
      pageSize,
      current,
    });
  }

  render() {
    const {
      data, current, pageSize, total, isLoading,
    } = this.props;
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      render: (text, record) => <Link to={`/ArticleDetail/${record.key}`}>{text}</Link>,
    }, {
      title: '类别',
      dataIndex: 'type',
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      render: text => formatDate(text),
    }, {
      title: '状态',
      dataIndex: 'status',
      render: text => (text === 'released' ? '已发布' : '暂存'),
    }, {
      title: '操作',
      dataIndex: '_id',
      render: (text, record) => (<div><Link to={`/ArticleEdit/${record.key}`}>编辑</Link> <a onClick={() => { this.removeArticle(record.key); }}>删除</a></div>),
    }];

    return (
      <div>
        <BreadNav config={this.BreadNav} />
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Search onSubmit={this.handleFormChange} />
          <div style={{ paddingBottom: '20px' }}>
            <Link to="/ArticleAdd">
              <Button>新增文章</Button>
            </Link>
          </div>
          <Table
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
  removeArticle: (id, queryVo) => dispatch(creatorAsync({
    type: 'REMOVE_ARTICLE',
    name: 'removeArticle',
    params: { id },
  })).then((content) => {
    if (content.isSuccess) {
      dispatch(articleQuery(queryVo));
    }
  }),
});

const mapStateToProps = ({ articleList }) => ({
  ...articleList,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleList);
