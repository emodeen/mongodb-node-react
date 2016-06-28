

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval); 	
  },

  render: function() {
    return (     
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />                
        <CommentForm />
        <RestaurantTable />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {

    var commentNodes = this.props.data.map(function(restaurant) {
      return (
        <Comment name={restaurant.name} key={restaurant.restaurant_id}>
          {restaurant.name}
        </Comment>
      );
    });  	
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var RestaurantTable = React.createClass({
  render: function() {
    return (
      <div className="restaurantTable">
        <table>
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Description</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/restaurants" pollInterval={2000} />,	
  document.getElementById('content')
);      