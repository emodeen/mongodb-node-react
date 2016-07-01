

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
        <CommentList data={this.state.data} />                
        <RestaurantTable data={this.state.data}/>
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

var RestaurantRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.restaurant.name}</td>
        <td>Test2</td>
      </tr>
    );
  }
});

var RestaurantTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.data.forEach(function(restaurant) {
      rows.push(<RestaurantRow restaurant={restaurant} key={restaurant.name}/>);
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

ReactDOM.render(
  <CommentBox url="/restaurants" pollInterval={2000} />,	
  document.getElementById('content')
);      