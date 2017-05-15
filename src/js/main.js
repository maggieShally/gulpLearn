let React  = require('react');
let ReactDOM = require('react-dom');


import { CommentList, CommentForm } from './tt2.js'



var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];





var MyClickHandle = React.createClass({
    handleClick: function(){
        this.refs.myTextInput.focus();
    },
    render: function(){
        return (
            <div>
                <input type="text" ref="myTextInput" />
                <input type="button" value="Focus the text input" onClick={this.handleClick} />
            </div>
        )
    }
});

var Input = React.createClass({
    getInitialState: function(){
        return {
            value:'hello'
        }
    },
    handleChange: function(event){
        this.setState({
            value: event.target.value
        })
    },
    render: function(){
        var value = this.state.value;
        return (
            <div>
                <input type='text' value={value}
                    onChange={this.handleChange}

                />
                <p>{value}</p>
                <span></span>

            </div>
        )
    }
});


var HelloOpacity = React.createClass({
    getInitialState: function(){
        return {
            opacity: 1.0
        }
    },
    componentDidMount: function(){
        this.timer = setInterval(function(){
            var opacity = this.state.opacity;
            opacity -= .05;
            if(opacity < 0.1){
                opacity = 1.0
            }
            this.setState({
                opacity: opacity
            })
        }.bind(this),100)
    },
    render: function(){
        return (
            <div style={{opacity: this.state.opacity}}>
                hello {this.props.name}
                <span></span>

            </div>
        )
    }
});


var CommentBox = React.createClass({
    //this.props一般表示一旦定义就不再改变的特性，this.state一般表示会随着用户互动而产生变的特性
    getInitialState: function(){//生命周期里只执行一次，并设置组件的初始状态
        return {
            data: data,
            liked: false
        }
    },
    getDefaultProps: function(){//设置组件属性默认值
        return {
            title: 'this is my title',
            name: 'maggie maggie maggie',
        }
    },
    componentDidMount: function(){//是一个当组件被渲染时被Ｒeact自动调用的方法。       
        $.ajax({
            url: this.props.url,         
            type: 'get',         
            dataType: 'json',
            success: function(res){           
                console.log(res);
                this.setState({data: res});

            }.bind(this),         
            error: function(xhr,status,err){
                console.error(this.props.url,status,err.toString());         
            }.bind(this)
        })   
    }, 
    showToggle: function(){
        this.setState({
            liked: !this.state.liked
        })
    },    
    render: function() {    
        var text = this.state.liked ? 'like' : 'haven\'t liked'; 
        return (       
            <div className="commentBox"> 
                <HelloOpacity name={this.props.name}/>
                <h1>{this.props.title}</h1>         
                <CommentList data={this.state.data}></CommentList>         
                <CommentForm></CommentForm>
                <MyClickHandle/>
                <div>
                    <p onClick={this.showToggle}>
                        you {text} this. Click to toggle
                    </p>
                </div>
                <Input/>
            </div>     
        );   
    } 
});



ReactDOM.render(
	<CommentBox url="https://api.github.com/users/octocat/gists"/>,
    document.getElementById('reactApp')
);