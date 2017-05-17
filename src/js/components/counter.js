import React, { findDOMNode,Component,PropTypes } from 'react'

import ReactDOM from 'react-dom'


var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

export default class CountNum extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: 'this is a big title'
    }
  }

  render(){
    return (
      <div>
        <input type="number" ref="countInput"/>
        <button onClick = {e => this.addNumClick(e)} type="button">加加</button>
        <button onClick = {e => this.reduceNumClick(e)} type="button">减减</button>
        <span>{this.props.counts}</span>
        <h2>{this.state.title}</h2>
        <ul>
          {
            this.props.data.map(function(item){
              return <li key={item.id}>{item.author}------{item.text}</li>
            })
          }
        </ul>
      </div>
    )
  }
  addNumClick(e){
    const node = ReactDOM.findDOMNode(this.refs.countInput);
    const val = parseInt(node.value.trim());
    this.props.onAddCountClick(val);
    node.value = '';
  }
  reduceNumClick(e){
    const node = ReactDOM.findDOMNode(this.refs.countInput);
    const val = parseInt(node.value.trim());
    this.props.onRecudeCountClick(val);
    node.value = '';
  }
}


CountNum.defaultProps = {
    data: data
}


