import React, { Component } from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import marked from 'marked';
import { creatorAsync } from '../../../actions';
import { formatDate } from '../../../app/uilts';
import './style.less';
import '../../common/FormFields/style.less';

const { Header, Content } = Layout;

class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    this.getArticle(params);
  }

  componentDidMount() {
    marked.setOptions(this.props.option);
  }

  getArticle({ id }) {
    if (id) {
      this.props.getArticleDetail(id);
    }
  }

  render() {
    const { article } = this.props;
    return (
      <div className="artcledetail">
        <Layout style={{ height: '100vh' }}>
          <Header className="header">
            <div className="logo">
              {'我的博客'}
            </div>
          </Header>
          <Content className="artcledetail-post">
            <div className="artcledetail-body">
              <div className="artcledetail-title">
                {
                  article.name || ''
                }
              </div>
              <div className="artcledetail-author">
                <div className="artcledetail-author-name">
                  admin
                </div>
                <div className="artcledetail-author-updatetime">
                  {
                    article.updateTime ? formatDate(article.updateTime) : ''
                  }
                </div>
              </div>
              <div className="artcledetail-show-content markdown-edit-view" dangerouslySetInnerHTML={{ __html: marked(article.content || '') }} />
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

ArticleDetail.defaultProps = {
  getArticleDetail: () => {},
  article: {},
  option: {
    gfm: true,
    breaks: true,
    smartypants: true,
    // highlight: (code) => {
    //   return window.hljs.highlightAuto(code, {
    //     language: 'javascript',
    //   }).value;
    // },
  },
};

ArticleDetail.propTypes = {
  getArticleDetail: PropTypes.func,
  option: PropTypes.objectOf(PropTypes.any),
  article: PropTypes.objectOf(PropTypes.any),
};

const mapDispatchToProps = dispatch => ({
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
)(ArticleDetail);
