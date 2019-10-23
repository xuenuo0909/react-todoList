import React from 'react'

export default class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  filterList(type) {
    let arr = [];
    if (type === 'all') {
      arr = this.props.list;
    } else if (type === 'can') {
      arr = this.props.list.filter(item => item.status === '已完成');
    } else if (type === 'not') {
      arr = this.props.list.filter(item => item.status === '未完成');
    }
    this.setState({
      list: arr
    })
  }

  componentDidMount() {
    this.props.onRef(this);
    this.filterList('all');
  }

  render() {
    return (
      <div>
        {
          this.state.list.map(item => {
            return <div key={ item.id } style={{ cursor: 'pointer' }}>
              <span onClick={ this.props.handleClass.bind(this, item) }>{ item.title }</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{ item.status }</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={ this.props.removeStrip.bind(this, item) }>删除</button>
            </div>
          })
        }
      </div>
    )
  }
}
