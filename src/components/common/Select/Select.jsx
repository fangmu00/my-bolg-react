import React, { PropTypes } from 'react';
import { Select } from 'antd';
import { isArray, deepCopy } from '../Utils/index';

const { Option } = Select;

class Select2 extends React.Component {
  static defaultProps = {
    option: [{ key: 'test', value: 'TEST' }],
    onChange: () => {}
  }

  static propTypes = {
    onChange: PropTypes.func,
    option: PropTypes.objectOf(PropTypes.any)
  }

  constructor(props){
    super(props);
    this.state = {};
  }

  handleChange(value) {
    console.log(`selected ${value}`);
    this.props.onChange(value);
  }

  render() {
    const { option } = this.props;
    let _option = [];
    if (!isArray(option)) {
      Object.keys(option).forEach((item) => {
        _option.push({ key: item, value:option[item] })
      });
    } else {
      _option = deepCopy(option);
    }
    return (
      <Select onChange={this.handleChange.bind(this)} {...this.props}>
        {
          _option.map((item) => {
            const disabled = item.disabled ? item.disabled : false;
            return <Option key={item.key} value={item.key} disabled={disabled}>{item.value}</Option>
          })
        }
      </Select>
    )
  }
};

export default Select2;
