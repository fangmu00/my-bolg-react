import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { connect } from 'react-redux';
import Form from '../common/Form/index';
import BreadNav from '../common/BreadNav';
import { articleAddorEdit, creatorAsync } from '../../actions';

class ArticleAddorEdit extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    this.getArticle(params);
    this.initConfig();
    this.articleId = params.articleId;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.save();
    }, 20000);
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    this.articleId = params.articleId;
    if (params.articleId !== this.props.match.params.articleId) {
      this.getArticle(params);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    document.removeEventListener('keydown', this.handleKeyDown);
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
    const { article } = this.props;
    const { id } = article;
    const data = this.getData(false);
    if (this.articleId) {
      data.id = this.articleId;
    } else if (id) {
      data.id = id;
    }
    data.operationCode = 'saved';
    this.props.onArticleAddorEdit(data);
  }

  handleKeyDown(e) {
    const { keyCode, ctrlKey } = e;
    if (keyCode === 83 && ctrlKey) {
      e.preventDefault();
      this.save();
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
              title: this.articleId ? '编辑文章' : '新增文章',
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
  getArticleDetail: () => {},
};

ArticleAddorEdit.propTypes = {
  onArticleAddorEdit: PropTypes.func,
  getArticleDetail: PropTypes.func,
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
