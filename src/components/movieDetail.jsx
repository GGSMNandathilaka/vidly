import React, { Component } from "react";

class MovieDetail extends Component {
  handleSave = () => {
    this.props.history.replace("/");
  };
  render() {
    return (
      <div>
        <h1>Movie from {this.props.match.params.id}</h1>
        <button className="btn btn-primary m-2" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetail;
