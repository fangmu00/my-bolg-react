import React, { PropTypes } from 'react';
import marked from 'marked';
import { Input, Row, Col, Upload, Button, message, Icon } from 'antd';

import { cmd, uploadRPC } from './const';
import './style.less';

// toDo 回退功能
class MarkdownEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: this.props.value,
      value: '',
      selectionStart: 0,
      selectionEnd: 0,
      history: {
        data: [''],
        currentIndex: 0,
      }, // 记录操作记录
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    marked.setOptions(this.props.option);
    this.view.innerHTML = marked(this.state.value);
  }

  componentWillReceiveProps({ value }) {
    if (value) {
      const { history } = this.state;
      history.data[history.data.length - 1] = value;
      this.setState({
        value,
        history,
      }, this.renderView);
    }
  }

  setHistory(value) {
    const { history } = this.state;
    history.data.push(value);
    history.currentIndex = history.data.length - 1;
  }

  prevHistory() {
    const { history } = this.state;
    if (history.currentIndex >= 0) {
      history.currentIndex -= 1;
      this.setState({
        value: history.data[history.currentIndex],
        history,
      }, this.renderView);
    }
  }

  nextHistory() {
    const { history } = this.state;
    if (history.currentIndex < history.data.length) {
      history.currentIndex += 1;
      this.setState({
        value: history.data[history.currentIndex],
        history,
      }, this.renderView);
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    }, this.renderView);
    this.setHistory(e.target.value);
    this.props.onChange(e.target.value);
  }

  handleClick(e) {
    const textarea = e.target;
    const { selectionStart, selectionEnd } = textarea;
    this.setState({
      selectionStart,
      selectionEnd,
    });
  }

  selectionReplace(text) {
    const { value, selectionStart, selectionEnd } = this.state;
    const v = value || '';
    const textBefore = v.substring(0, selectionStart);
    const textAfter = v.substring(selectionEnd, value.length);
    const backValue = `${textBefore}${text}${textAfter}`;
    this.setState({
      value: backValue,
    }, this.renderView);
    this.setHistory(backValue);
  }

  renderView() {
    this.view.innerHTML = marked(this.state.value || '');
  }

  renderButton() {
    const me = this;
    const { history } = me.state;
    const props = {
      name: 'file',
      action: uploadRPC,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          const imgCode = cmd.img(info.file.name, info.file.response.content.retValue.path);
          me.selectionReplace(imgCode);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    console.log(history);
    return (
      <div className="markdown-edit-actionbar" style={{ marginBottom: '10px' }}>
        <Button
          onClick={() => {
            this.selectionReplace(cmd.code);
          }}
        >
          插入代码
        </Button>
        <Button
          onClick={() => {
            this.selectionReplace(cmd.table);
          }}
        >
          插入表格
        </Button>
        <Button
          onClick={() => {
            const { value, selectionStart, selectionEnd } = this.state;
            this.selectionReplace(cmd.link(value.substring(selectionStart, selectionEnd)));
          }}
        >
          插入链接
        </Button>
        <Upload {...props}>
          <Button>
            上传图片
          </Button>
        </Upload>
        <Button
          onClick={() => {
            this.prevHistory();
          }}
          disabled={history.currentIndex === 0}
        >
          <Icon type="arrow-left" />
        </Button>
        <Button
          onClick={() => {
            this.nextHistory();
          }}
          disabled={history.currentIndex === history.data.length - 1}
        >
          <Icon type="arrow-right" />
        </Button>
      </div>

    );
  }
  render() {
    return (
      <Row gutter={16}>
        {
          this.renderButton()
        }
        <Col span={12}>
          <Input
            type="textarea"
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onClick={this.handleClick}
            onKeyUp={this.handleClick}
            value={this.state.value}
            autosize={{ minRows: 20, maxRows: 20 }}
            ref={(c) => { this.textareaRef = c; }}
          />
        </Col>
        <Col span={12}>
          <div className="markdown-edit-view" style={{ height: '190px', overflow: 'auto' }} ref={(c) => { this.view = c; }} />
        </Col>
      </Row>
    );
  }
}

MarkdownEdit.defaultProps = {
  option: {
    gfm: true,
    breaks: true,
    smartypants: true,
    highlight: code => window.hljs.highlightAuto(code).value,
  },
  placeholder: '',
  // value: '# Marked in browser\n\nRendered by **marked**.',
  onChange: () => {},
};

MarkdownEdit.propTypes = {
  onChange: PropTypes.func,
  // value: PropTypes.string,
  placeholder: PropTypes.string,
  option: PropTypes.objectOf(PropTypes.any),
};

export default MarkdownEdit;
