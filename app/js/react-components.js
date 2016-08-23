var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var App = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  }
});

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


var EventEditBtn = React.createClass({
  editEvent: function() {  
    $.ajax({
      url: (this.props.url + "/:" + this.props.event._id),
      method: 'PUT',
      data: JSON.stringify({ id: this.props.event._id }),
      contentType: "application/json",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },  
  render: function() {
    return (
      <div><button onClick={this.editEvent}>Edit</button></div>
    );
  }
});


var EventDeleteBtn = React.createClass({
  deleteEvent: function() {  
    $.ajax({
      url: (this.props.url + "/:" + this.props.event._id),
      method: 'DELETE',
      data: JSON.stringify({ id: this.props.event._id }),
      contentType: "application/json",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div><button onClick={this.deleteEvent}>Delete</button></div>
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
        <td><EventEditBtn event={this.props.event} url={this.props.url}></EventEditBtn></td>
        <td><EventDeleteBtn event={this.props.event} url={this.props.url}></EventDeleteBtn></td>
        <td><App event={this.props.event} url={this.props.url}></App></td>
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