import React from 'react';
import { Button } from 'antd';
import Form from '../common/Form/index';
import BreadNav from '../common/BreadNav';

class ArticleAddorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        fields: [
          ['Name', '', ''],
          ['Type', '', ''],
          ['Content']
        ],
        labels: {
          Name: '标题[请输入]',
          Type: '分类[请选择]',
          Content: '内容[请输入]'
        },
        types: {
          Name: 'Input',
          Type: 'Select',
          Content: 'MarkdownEdit'
        },
        props: {
          Name: {
            required: true
          },
          Type: {
            required: true
          },
          Content: {
            required: true
          }
        },
        options: {
          Type: {
            'JS': 'JS',
            'CSS': 'CSS'
          }
        }
      }
    };
    this.initConfig();
  }

  initConfig() {
    this.BreadNav = [
      {
        title: '文章管理'
      },
      {
        title: '新增文章'
      }
    ]
  }

  render() {
    return (
      <div>
        <BreadNav config={this.BreadNav}  />
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Form
            config={ this.state.config }
            onSubmit={(v) => { console.log(v) }}
          />
          <div className={'btn-father text-left'}>
            <Button type="primary">{'提交'}</Button>
            <Button>{'暂存'}</Button>
            <Button>{'返回'}</Button>
          </div>
        </div>

      </div>
    )
  }
}

export default ArticleAddorEdit;
