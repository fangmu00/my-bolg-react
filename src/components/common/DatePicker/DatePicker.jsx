import React, { PropTypes } from 'react';
import { DatePicker } from 'antd';


class DatePicker2 extends React.Component {
  static defaultProps = {
    type: 'Date',
    onChange: () => {}
  }

  static propTypes = {
    onChange: PropTypes.func,
    type: PropTypes.string
  }

  constructor(props){
    super(props);
    this.state = {};
  }

  handleChange(value) {
    console.log(`DatePicker ${value}`);
    this.props.onChange(value);
  }

  renderDatePicker() {
    return <DatePicker {...this.props} onChange={this.handleChange.bind(this)} />
  }

  renderRangePicker() {
    const { RangePicker } = DatePicker;
    return <RangePicker {...this.props} onChange={this.handleChange.bind(this)} />
  }

  renderMonthPicker() {
    const { MonthPicker } = DatePicker;
    return <MonthPicker {...this.props} onChange={this.handleChange.bind(this)} />
  }

  render() {
    const { type } = this.props;
    let html;
    if (type === 'Range') {
      html = this.renderRangePicker();
    } else if (type === 'Month') {
      html = this.renderMonthPicker();
    } else {
      html = this.renderDatePicker();
    }
    return (
      <div>
        {
          html
        }
      </div>
    )
  }
};

export default DatePicker2;
