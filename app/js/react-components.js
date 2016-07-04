
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
        <EventTable data={this.state.data}/>
      </div>
    );
  }
});

var EventRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.event.name}</td>
        <td>Test2</td>
      </tr>
    );
  }
});

var EventTable = React.createClass({
  render: function() {
    var rows = [];
    this.props.data.forEach(function(event) {
      rows.push(<EventRow event={event} key={event.name}/>);
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
  <CommentBox url="/events" pollInterval={2000} />,	
  document.getElementById('content')
);      