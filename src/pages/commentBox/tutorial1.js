


var CommentBox = React.createClass({displayName: 'CommentBox',
	render: function(){
		return (
			React.createElement('div',{className: 'commentBox'},
				"hello world I am a commentBox"
			)
		)
	}

});

ReactDOM.render(
	React.createElement(CommentBox,null),
	document.getElementById('reactApp')
);



