import React, { PropTypes } from 'react';
import { Form, Button, Row, Col } from 'antd';
import formFields from '../FormFields/index';

const FormItem = Form.Item;
class Form2 extends React.Component {
  static propTypes = {
    config: PropTypes.objectOf(PropTypes.any),
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    config: {
      fields: [
        ['Input1', 'Input2', ''],
        ['Select', '', ''],
        ['SUBMIT', 'RESET']
      ],
      labels: {
        Input1: '测试input1[我是placeholder]',
        Input2: '测试input2[我是placeholder]',
        Select: '测试Select[我是placeholder]',
        SUBMIT: '查询',
        RESET: '清空'
      },
      types: {
        Input1: 'Input',
        Input2: 'Input',
        Select: 'Select'
      },
      props: {
        Input1: {
          required: true
        },
        Input2: {
          readOnly: true
        },
        Select: {
          required: true
        }
      },
      options: {
        Select: {
          'key1': 'value1',
          'key2': 'value2'
        }
      }
    },
    onChange: () => {},
    onSubmit: () => {}
  }

  constructor(props) {
    super(props);
    this.status = {};
  }

  handleReset() {
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);
    });
  }

  getLabelAandPlaceholder(text){
    const regExp = /\[(.*?)\]/g;
    const res = regExp.exec(text);
    if (res != null) {
      return {
        label: text.substring(0, res.index),
        placeholder: res[1]
      }
    };
    return {
      label: text
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { config } = this.props;
    const { fields, labels, types, props, options } = config;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 }
    };
    const children = [];
    fields.forEach((outItem, i) => {
      const len = outItem.length;
      const span = 24/len - 24%len;
      outItem.forEach((inItem, j) => {
        if (inItem != '') {
          const labelObj = this.getLabelAandPlaceholder(labels[inItem]);
          const placeholder = labelObj.placeholder;
          const key = `Col-${i}-${j}`;
          if ( inItem === 'SUBMIT' ) {
            children.push(
              <Col span={span} key={key} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">{ labelObj.label }</Button>
              </Col>
            );
          } else if ( inItem === 'RESET' ) {
            children.push(
              <Col span={span} key={key} style={{ textAlign: 'center' }}>
                <Button onClick={this.handleReset.bind(this)}>{ labelObj.label }</Button>
              </Col>
            );
          } else {
            const Type = types[inItem];
            const Copt = formFields[types[inItem]];
            let itemOption = {};
            let required = false;
            if (Type === 'Select') {
              if (options[inItem]) {
                itemOption = { option: options[inItem] }
              }
            }
            if (props[inItem] && props[inItem].required) {
              required = true;
            }
            children.push(
              <Col span={span} key={key}>
                <FormItem {...formItemLayout} label={labelObj.label} hasFeedback>
                  {getFieldDecorator(inItem, {
                      rules: [{ required: required, message: '该项必填!' }]
                    })(
                      <Copt placeholder={placeholder ? placeholder : ''} {...itemOption} />
                  )}
                </FormItem>
              </Col>
            );
          }

        } else {
          children.push(<Col span={span} key={Math.random()} />);
        }
      });
    });
    return (
      <Form
        className="ant-advanced-search-form"
        onSubmit={this.handleSubmit.bind(this)}
      >
        <Row type="flex" gutter={48}>
          {children}
        </Row>

      </Form>
    );
  }
}

export default Form.create()(Form2);
