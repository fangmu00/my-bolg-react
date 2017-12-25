import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import Form from '../common/Form/index';
import BreadNav from '../common/BreadNav';
import { articleAddorEdit } from '../../actions';

class ArticleAddorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        fields: [
          ['name', '', ''],
          ['type', '', ''],
          ['content'],
        ],
        labels: {
          name: '标题[请输入]',
          type: '分类[请选择]',
          content: '内容[请输入]',
        },
        types: {
          name: 'Input',
          type: 'Select',
          content: 'MarkdownEdit',
        },
        props: {
          name: {
            required: true,
          },
          type: {
            required: true,
          },
          content: {
            required: true,
          },
        },
        options: {
          type: {
            JS: 'JS',
            CSS: 'CSS',
          },
        },
      },
    };
    this.initConfig();
    this.sumbit = this.sumbit.bind(this);
    this.save = this.save.bind(this);
  }

  getData(validate = false) {
    if (validate) {
      this.formRef.props.form.validateFields((err) => {
        if (!err) {
          return this.formRef.props.form.getFieldsValue();
        }
        return null;
      });
    }
    return this.formRef.props.form.getFieldsValue();
  }

  initConfig() {
    this.BreadNav = [
      {
        title: '文章管理',
      },
      {
        title: '新增文章',
      },
    ];
  }

  sumbit() {
    const data = this.getData(true);
    if (data) {
      data.operationCode = 'add';
      this.props.onArticleAddorEdit(data, this.props.history);
    }
  }

  save() {
    const data = this.getData();
    data.operationCode = 'save';
    this.props.onArticleAddorEdit(data);
  }

  render() {
    return (
      <div>
        <BreadNav config={this.BreadNav} />
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Form
            // data={{
            //   content: '# Marked in browser\n\nRendered by **marked**.',
            //   type: 'JS',
            // }}
            config={this.state.config}
            onChange={(value, attrName) => {
              console.log(value, attrName);
            }}
            wrappedComponentRef={(inst) => { console.log(inst); this.formRef = inst; }}
          />
          <div className="btn-father text-left">
            <Button type="primary" onClick={this.sumbit}>提交</Button>
            <Button onClick={this.save}>暂存</Button>
            <Button onClick={() => {
                this.props.history.goBack();
              }}
            >
            返回
            </Button>
          </div>
        </div>

      </div>
    );
  }
}

ArticleAddorEdit.defaultProps = {
  onArticleAddorEdit: () => {},
};

ArticleAddorEdit.propTypes = {
  onArticleAddorEdit: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onArticleAddorEdit: (values, history) => dispatch(articleAddorEdit(values, history)),
});

const mapStateToProps = ({ article }) => ({
  article,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleAddorEdit);
