import React from 'react';
import PropTypes from 'prop-types';
import Form from '../../common/Form/index';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formConfig: {
        fields: [
          ['name', 'type', 'date', 'status'],
          ['SUBMIT'],
        ],
        labels: {
          name: '标题[请输入]',
          type: '分类[请选择]',
          date: '更新日期[请选择]',
          status: '状态[请选择]',
          SUBMIT: '查询',
        },
        types: {
          name: 'Input',
          type: 'Select',
          date: 'DatePicker',
          status: 'Select',
        },
        props: {
          date: {
            type: 'Range',
            placeholder: ['开始时间', '结束时间'],
          },
          type: {
            allowClear: true,
          },
          status: {
            allowClear: true,
          },
        },
        options: {
          type: {
            JS: 'JS',
            CSS: 'CSS',
          },
          status: {
            released: '已发布',
            saved: '草稿',
          },
        },
      },
    };
  }

  render() {
    const { formConfig } = this.state;
    return (
      <Form
        config={formConfig}
        onSubmit={(data) => {
          console.log(data);
          this.props.onSubmit(data);
        }}
      />
    );
  }
}

Search.defualtProps = {
  onSubmit: () => {},
};

Search.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Search;
