let React  = require('react');
let ReactDOM = require('react-dom');


var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
      </div>
    );
  }
});


export var CommentList = React.createClass({
 render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
         <div className="comment" key={comment.id}>
            <h2 className="commentAuthor">
              {comment.author}
            </h2>
          </div>
      );
    });
    return (
      <div className="commentList">{commentNodes}</div>
    );
  }
});

export var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});