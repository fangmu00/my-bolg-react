import React, { PropTypes } from 'react';
import { Button, message } from 'antd';
import { connect } from 'react-redux';
import Form from '../common/Form/index';
import BreadNav from '../common/BreadNav';
import { articleAddorEdit, creatorAsync } from '../../actions';

class ArticleAddorEdit extends React.Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    this.getArticle(params);
    this.initConfig();
    this.articleId = params.articleId;
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    this.articleId = params.articleId;
    if (params.articleId !== this.props.match.params.articleId) {
      this.getArticle(params);
    }
  }

  getData(validate = false) {
    let hasError = false;
    if (validate) {
      this.formRef.props.form.validateFields((err) => {
        if (err) {
          hasError = true;
        }
      });
    }
    return hasError ? null : this.formRef.props.form.getFieldsValue();
  }

  getArticle({ articleId }) {
    if (articleId) {
      this.props.getArticleDetail(articleId);
    }
  }

  initConfig() {
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
    this.sumbit = this.sumbit.bind(this);
    this.save = this.save.bind(this);
  }

  sumbit() {
    // const { article } = this.props;
    // const { id } = article;
    const data = this.getData(true);
    if (data) {
      if (this.articleId) {
        data.id = this.articleId;
      }
      data.operationCode = 'add';
      this.props.onArticleAddorEdit(data, this.props.history);
    }
  }

  save() {
    // const { article } = this.props;
    // const { id } = article;
    const data = this.getData(false);
    if (data.name === undefined) {
      message.error('标题不能为空');
    } else {
      if (this.articleId) {
        data.id = this.articleId;
      }
      data.operationCode = 'save';
      this.props.onArticleAddorEdit(data);
    }
  }

  render() {
    const { article } = this.props;
    return (
      <div>
        <BreadNav config={[
            {
              title: '文章管理',
            },
            {
              title: article.id ? '编辑文章' : '新增文章',
            },
          ]}
        />
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Form
            data={this.articleId ? article : null}
            config={this.state.config}
            onChange={(value, attrName) => {
              console.log(value, attrName);
            }}
            wrappedComponentRef={(inst) => { this.formRef = inst; }}
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
  getArticleDetail: id => dispatch(creatorAsync({
    type: 'GET_ARTICLE',
    name: 'getArticleDetail',
    params: { id },
  })),
});

const mapStateToProps = ({ article }) => ({
  article,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleAddorEdit);
