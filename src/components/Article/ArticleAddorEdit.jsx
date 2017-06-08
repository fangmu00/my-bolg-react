import React from 'react';
import { Table, Button } from 'antd';
import BreadNav from '../common/BreadNav';

class ArticleAddorEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text: ''
        };
        this.initConfig();
    }

    initConfig() {
      this.BreadNav = [
        {
          title: '文章管理'
        },
        {
          title: '新增文章'
        }
      ]
    }

    handleChange(e) {
      const el = e.target;
      const objString = el.value;
      const cursorPosition = el.selectionEnd; // 光标位置
      const beforeAtString = objString.substr(0, cursorPosition); // 光标之前的字符串
      const atLocation = beforeAtString.lastIndexOf('@'); //记录@在光表前出现的最近的位置
      const enterLocation = beforeAtString.lastIndexOf('\n'); //记录回车在光表前出现的最近的位置
      const indexString = objString.substr(atLocation, cursorPosition - atLocation);
      let enterLen = beforeAtString.match(/\n/g); //换行符的数量
      if (enterLen) {
        enterLen = enterLen.length;
      } else {
        enterLen = 0;
      }
      const _beforeAtString = beforeAtString.replace(/<|>/g,'?').replace(/\r\n|\r|\n/g,"<br/>").replace(/\s/g,'&nbsp;');
      this.setState({
        text: _beforeAtString,
        maxWidth: el.style.width
      });
      console.log(this.atEl)
    }

    render() {
        return (
          <div>
            <BreadNav config={this.BreadNav}  />
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <textarea onKeyUp={this.handleChange.bind(this)} onKeyDown={this.handleChange.bind(this)} onMouseUp={this.handleChange.bind(this)} onMouseDown={this.handleChange.bind(this)} />
            </div>
            <div style={{ width: this.state.maxWidth, border: '1px' }}>
              <span style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: this.state.text }} /><span ref={(c) => {this.atEl = c;}}>{'|'}</span>
            </div>
          </div>
        )
    }
}

export default ArticleAddorEdit;
