
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
        <EventTable data={this.state.data} url={this.props.url}/>
      </div>
    );
  }
});

var EventDeleteBtn = React.createClass({
  handleClick: function(e) {
    console.log("clicked " + this.props.event.venue);
  },  
  render: function() {
    return (
      <div><button onClick={this.handleClick}>Delete</button></div>
    );
  }
});

var EventRow = React.createClass({
  render: function() {   
    return (
      <tr>
        <td>{this.props.event.date}</td>
        <td>{this.props.event.time}</td>
        <td>{this.props.event.venue}</td>
        <td>{this.props.event.attendees}</td>
        <td>{this.props.event.rating}</td>
        <td><EventDeleteBtn event={this.props.event}></EventDeleteBtn></td>
      </tr>
    );
  }
});

var EventTable = React.createClass({
  render: function() {
    var rows = [];
    var baseUrl = this.props.url;

    this.props.data.forEach(function(event) {
      rows.push(<EventRow event={event} key={event._id} url={baseUrl}/>);
    });
    return (
      <table className="table table-hover">
        <thead>
          <tr className="header-row">
            <th>Date</th>
            <th>Time</th>
            <th>Venue</th>
            <th>Attendees</th>
            <th>Rating</th>
            <th></th>                        
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