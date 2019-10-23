import React from 'react';
import './ToDoList.css';
import Content from './Content';

export default class ToDoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [
        {id: 0, title: '天气不错哦', status: '未完成', index: 0},
        {id: 1, title: '德玛西亚', status: '未完成', index: 1}
      ],
      value: '',
      child:""
    }
  }

  addToStrip() {
    this.state.array.push({id:this.randomId() , title: this.state.value, status: '未完成', index: 2});
    this.setState({
      array: this.state.array
    });
  }

  randomId() {
    return (Math.random()*10000000).toString(16).substr(0,4)+'-'+(new Date()).getTime()+'-'+Math.random().toString().substr(2,5);
  }

  handleBlur(e) {
    this.setState({
      value: e.target.value
    });
  }

  removeStrip(current) {
    this.state.array.forEach((item, index, list) => {
      if (item.id === current.id) {
        list.splice(index, 1);
      }
    });
    this.setState({
      array: this.state.array
    })
  }

  handleClass(current, e) {
    if (e.target.getAttribute('class')) {
      current.status = '未完成';
      e.target.setAttribute('class', '');
    } else {
      current.status = '已完成';
      e.target.setAttribute('class', 'rm-line');
    }

    this.state.array.forEach((item, index) => {
      if (item.id === current.id) {
        this.state.array.splice(index, current);
      }
    });
    this.setState({
      array: this.state.array
    });
  }

  handleListtype(value) {
    console.log(this.child, 'this.child');
  }

  onRef = (ref) => {
    this.child = ref;
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" onBlur={ this.handleBlur.bind(this) }/>
          <button onClick={ this.addToStrip.bind(this) }>添加</button>
        </div>
        <Content
          onRef={ this.onRef }
          list={ this.state.array }
          handleClass={ this.handleClass.bind(this) }
          removeStrip={ this.removeStrip.bind(this) }
          handleListtype={ this.handleListtype.bind(this, this.state.type) }>
        </Content>
        <div>
          <button onClick={ this.handleListtype.bind(this, 'all') }>全部</button>
          <button onClick={ this.handleListtype.bind(this, 'not') }>还未完成</button>
          <button onClick={ this.handleListtype.bind(this, 'can') }>已完成</button>
        </div>
      </div>
    )
  }
}
