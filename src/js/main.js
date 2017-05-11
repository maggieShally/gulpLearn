let React  = require('react');
let ReactDOM = require('react-dom');
// require('./tt2.js');


import { CommentList, CommentForm } from './tt2.js'

// ReactDOM.render(
//     <h1>Hello, world!</h1>,
//     document.getElementById('reactApp')
// );


var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];




var CommentBox = React.createClass({
  getInitialState: function(){//生命周期里只执行一次，并设置组件的初始状态
     return {
        data: data
     }
  },
  componentDidMount: function(){//是一个当组件被渲染时被Ｒeact自动调用的方法。
      $.ajax({
        url: this.props.url,
        type: 'get',
        dataType: 'json',
        success: function(res){
          this.setState({data: res})
        }.bind(this),
        error: function(xhr,status,err){
          console.error(this.props.url,status,err.toString());
        }.bind(this);
      })
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm />
      </div>
    );
  }
});

ReactDOM.render(
	<CommentBox url="/api/comments"/>,
  document.getElementById('reactApp')
);