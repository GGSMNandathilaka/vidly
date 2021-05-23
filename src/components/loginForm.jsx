import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const account = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              value={account.username}
              name="username"
              onChange={this.handleChange}
              autoFocus
              id="username"
              type="text"
              className="form-control"
            />
            <small className="form-text text-muted"></small>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={account.password}
              name="password"
              onChange={this.handleChange}
              id="password"
              type="text"
              className="form-control"
            />
            <small className="form-text text-muted"></small>
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
