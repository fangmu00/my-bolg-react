import React, { PropTypes } from 'react';
import marked from 'marked';
import { Input, Row, Col, Upload, Button, Icon, message } from 'antd';

export const renderButton = () => {
  const props = {
    name: 'file',
    action: '//127.0.0.1:8090/file-upload',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button>
        <Icon type="upload" /> Click to Upload
      </Button>
    </Upload>
  );
};

class MarkdownEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: this.props.value,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    marked.setOptions(this.props.option);
    this.view.innerHTML = marked(this.state.value);
  }

  componentWillReceiveProps({ value }) {
    if (value) {
      this.setState({
        value,
      }, () => {
        this.view.innerHTML = marked(this.state.value);
      });
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    }, () => {
      this.view.innerHTML = marked(this.state.value);
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          {
            renderButton()
          }
          <Input
            type="textarea"
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            value={this.state.value}
            autosize={{ minRows: 10, maxRows: 10 }}
          />
        </Col>
        <Col span={12}>
          <div style={{ height: '190px', overflow: 'auto' }} ref={(c) => { this.view = c; }} />
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
