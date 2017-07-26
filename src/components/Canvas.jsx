import React from 'react';

class Anim extends React.Component {
  constructor(props) {
    super(props);
    this.state = null;
    this.clentW = document.body.clientWidth;
    this.clentH = document.body.clientHeight;
  }

  componentDidMount() {
    this.el.width = this.clentW;
    this.el.height = this.clentH;
    const context = this.el.getContext('2d');
    const star = this.getStar();

    context.fillStyle='#108ee9';
    context.beginPath();
    star.item.forEach((item) => {
      context.arc(item.x,item.y,item.l,0,2*Math.PI,true);
    });
    context.closePath();
    context.fill();
  }

  init() {
  }

  getStar() { // 生成图案对象
    const star = {};
    star.item = []; // 圆球对象
    star.itemLen = Math.floor(Math.random()*5+3); // 圆球个数
    for( let i = 0 ; i<star.itemLen; i++) {
      const x = Math.floor(Math.random()*this.clentW); // 圆心x坐标
      const y = Math.floor(Math.random()*this.clentH); // 圆心y坐标
      const l = Math.floor(Math.random()*20); // 圆半径
      star.item.push({
        x,y,l
      })
    }

    return star;
  }
  render() {
    return (
      <div style={{ "position": "fixed", "left": "0px", "top": "0px", "width": "100%", "height": "100%" } }>
        <canvas ref={(c) => (this.el = c)} />
      </div>
    )
  }
}

export default Anim
