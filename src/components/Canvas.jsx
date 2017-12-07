import React from 'react';

/* global document, requestAnimationFrame */

export const drawStar = (ctx, { items, color }) => {
  items.forEach((item) => {
    ctx.fillStyle = item.color;
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.l, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
  });
  ctx.strokeStyle = color;
  // linkline(ctx, items);
};

export const linkline = (ctx, items) => {
  if (items.length === 0) {
    return;
  }
  const { x: x0, y: y0 } = items[0];
  ctx.beginPath();
  items.forEach((item, i) => {
    if (i !== 0) {
      const { x, y } = item;
      ctx.moveTo(x0, y0);
      ctx.lineTo(x, y);
    }
  });
  ctx.closePath();
  ctx.stroke();
  linkline(ctx, items.slice(1));
};

export const setColor = () => {
  const colorArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += colorArray[Math.floor(Math.random() * 16)];
  }
  return color;
};

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
    const ctx = this.el.getContext('2d');
    this.init(ctx, Math.floor((Math.random() * 0) + 1));
  }

  setStar() { // 生成图案对象
    const star = {};
    const t = (Math.random() * this.clentH) / 2;
    const b = ((Math.random() * this.clentH) / 2) + (this.clentH / 2);
    const l = (Math.random() * this.clentW) / 2;
    const r = ((Math.random() * this.clentW) / 2) + (b - t);

    star.items = []; // 圆球对象
    // star.color = this.setColor();
    star.color = '#f2f2f2';
    star.itemLen = Math.floor((Math.random() * 3) + 8); // 圆球个数
    for (let i = 0; i < star.itemLen; i += 1) {
      star.items.push({
        x: Math.floor(l + (Math.random() * r)), // 圆心x坐标
        y: Math.floor(t + (Math.random() * b)), // 圆心y坐标
        l: Math.floor((Math.random() * 10) + 20), // 圆半径
        // moveAngle: 30,
        moveAngle: Math.floor(360 * Math.random()), // 移动弧度
        // color: '#f2f2f2'
        color: setColor(),
      });
    }
    return star;
  }

  getRef(c) {
    this.el = c;
  }

  run(ctx, starGroup) {
    const back = [];
    ctx.clearRect(0, 0, this.clentW, this.clentH);
    starGroup.forEach((item) => {
      drawStar(ctx, item);
      const i = 5;
      const backItem = {
        items: [],
      };
      item.items.forEach((s) => {
        const {
          moveAngle, x, y, l, color,
        } = s;
        const backS = {
          moveAngle, x, y, l, color,
        };
        const moveY = Math.sin((s.moveAngle / 180) * Math.PI) * i;
        if ((s.moveAngle >= 0 && s.moveAngle < 90) || (s.moveAngle >= 270 && s.moveAngle < 360)) {
          backS.x = x + i;
        } else {
          backS.x = x - i;
        }
        backS.y = y - moveY;
        if (
          (backS.x - backS.l) < 0 ||
          (backS.x + backS.l) > this.clentW ||
          (backS.y - backS.l) < 0 ||
          (backS.y + backS.l) > this.clentH
        ) {
          // backS.moveAngle = (backS.moveAngle + Math.PI) % (2 * Math.PI);
          // if (backS.moveAngle >= 0 && backS.moveAngle < Math.PI * 0.5) {
          //   backS.moveAngle += ((Math.PI * 0.5) - backS.moveAngle) * 2;
          // } else if (backS.moveAngle >= Math.PI * 0.5 && backS.moveAngle < Math.PI) {
          //   backS.moveAngle += ((Math.PI * 0.5) - backS.moveAngle) * 2;
          // }
          if ((backS.x - backS.l) <= 0) {
            backS.x = backS.l;
          } else if ((backS.x + backS.l) >= this.clentW) {
            backS.x = this.clentW - backS.l;
            if (backS.moveAngle >= 0 && backS.moveAngle < 90) {
              backS.moveAngle += ((90 - backS.moveAngle) * 2) + 180;
            } else {
              backS.moveAngle = 90 + (backS.moveAngle % 90);
            }
          } else if ((backS.y - backS.l) <= 0) {
            backS.y = backS.l;
          } else if ((backS.y + backS.l) >= this.clentH) {
            backS.y = this.clentH - backS.l;
          }
        }
        backItem.items.push(backS);
      });
      back.push(backItem);
    });
    requestAnimationFrame(this.run.bind(this, ctx, back));
  }

  init(ctx, num) {
    const starGroup = [];
    for (let i = 0; i < num; i += 1) {
      starGroup.push(this.setStar());
    }
    this.run(ctx, starGroup);
  }
  render() {
    return (
      <div style={{
          position: 'fixed',
          left: '0px',
          top: '0px',
          width: '100%',
          height: '100%',
          zIndex: '-1',
        }}
      >
        <canvas ref={this.getRef.bind(this)} />
      </div>
    );
  }
}

export default Anim;
