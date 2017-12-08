import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';
import { connect } from 'react-redux';
import Canvas from '../Canvas';
import { login } from '../../actions';
import './Login.less';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    const { onLogin, form } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        onLogin(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-panel">
        <Canvas />
        <span className="s" />
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1 className="login-text">
            {
              '博客后台'
            }
          </h1>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(<Input
              prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
              type="password"
              placeholder="密码"
            />)}
          </FormItem>

          <Button type="primary" htmlType="submit" className="login-form-button">
            {
              '登 录'
            }
          </Button>
        </Form>
      </div>

    );
  }
}

NormalLoginForm.defaultProps = {
  form: {},
  onLogin: () => {},
};

NormalLoginForm.propTypes = {
  form: PropTypes.objectOf(PropTypes.any),
  onLogin: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onLogin: values => dispatch(login(values)),
});

const mapStateToProps = ({ userInfo }) => ({
  userInfo,
});

const WrappedNormalLoginForm = Form.create()(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NormalLoginForm));

export default WrappedNormalLoginForm;
