import { Input } from 'antd';

class Input2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }


  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <Input {...this.props} onChange={this.handleChange.bind(this)} />
    )
  }
};

export default Input2;
