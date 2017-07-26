import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import Canvas from '../Canvas';

import './Login.less'
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
              '登录博客后台'
            }
          </h1>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }]
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }]
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
            )}
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

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
