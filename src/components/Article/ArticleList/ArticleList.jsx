import React from 'react';
import { Table, Button  } from 'antd';
import { Link } from 'react-router-dom';
import BreadNav from '../../common/BreadNav';
import Form from '../../common/Form/index';

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          formData: {
            Input1: 'input111111',
            Select: ['key1','key2']
          }
        };
        this.initConfig();
    }

    initConfig() {
      this.BreadNav = [
        {
          title: '文章管理'
        }
      ]
    }

    render() {
      const columns = [{
          title: '名称',
          dataIndex: 'name',
          render: text => <a href="#">{text}</a>
        }, {
          title: '类别',
          dataIndex: 'type'
        }, {
          title: '发布时间',
          dataIndex: 'releaseDate'
        }, {
          title: '操作',
          render: () => <div><a>编辑</a> <a>删除</a></div>
        }];
        const data = [{
          key: '1',
          name: '文章1',
          releaseDate: 456461,
          type: 'New York No. 1 Lake Park'
        }, {
          key: '2',
          name: '文章2',
          releaseDate: 456461,
          type: 'London No. 1 Lake Park'
        }];

        // rowSelection object indicates the need for row selection
        const rowSelection = {
          onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          }
        };
        return (
          <div>
            <BreadNav config={this.BreadNav}  />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Form
                onSubmit={(v) => { console.log(v) }}
                data={this.state.formData}
              />
              <div style={{ paddingBottom: '20px' }}>
                <Link to="/ArticleAddorEdit">
                  <Button>新增文章</Button>
                </Link>
              </div>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
            </div>
          </div>
        )
    }
}

export default ArticleList;
// this.form.setFieldsValue({ 'input1': Math.randan() })
