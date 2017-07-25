import React from 'react';
import Form from '../../common/Form/index';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: null,
      formConfig: {
        fields: [
          ['Name', 'Type', 'Date', 'Status'],
          ['SUBMIT']
        ],
        labels: {
          Name: '标题[请输入]',
          Type: '分类[请选择]',
          Date: '日期[请选择]',
          Status: '状态[请选择]',
          SUBMIT: '查询'
        },
        types: {
          Name: 'Input',
          Type: 'Select',
          Date: 'DatePicker',
          Status: 'Select'
        },
        props: {
          Date: {
            type: 'Range',
            placeholder: ['开始时间', '结束时间']
          },
          Type: {
            allowClear: true
          },
          Status: {
            allowClear: true
          }
        },
        options: {
          Type: {
            js: 'js',
            css: 'css'
          },
          Status: {
            released: '已发布',
            draft: '草稿'
          }
        }
      }
    };
  }

  render() {
    const { formConfig } = this.state;
    return (
      <Form
        config={ formConfig }
        onSubmit= {(data) => {
          console.log(data)
        }}
      />
    )
  }
}

export default Search
