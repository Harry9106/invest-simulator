import React, { Component } from "react";
import NavBar from "./components/routing/Nav";
import Routes from "./Routes";
import "./App.css";
import { withRouter } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cash: null,
      username: null,
      user_id: null,
      avatar: null,
      isAuthenticated: localStorage.getItem('token') ? true : false,
      rank: null
    };
  }

  // is a user logged in? we should get his data
  componentDidMount() {
    if (this.state.isAuthenticated) {

      // this error handler code repeats on each fetch call
      // good idea: refactor this out from here, into a service
      // even better idea: refactor all of the API handling into its own service
      let handleErrors = response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      // fetch returns Promise object
      // we chain error handling first
      // usually this should be done with .catch
      // but fetch works differently
      fetch('http://localhost:8000/api/v1/rest-auth/user/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        if (json.username && json.pk) {
          this.setState({username: json.username, user_id: json.pk, avatar: json.avatar, cash: json.cash, rank: json.rank});
        }
      })
      .catch(error => {
        alert(error);
      });

    }
  }

  // updates the main state
  userHasAuthenticated = (authenticated, username, id, avatar, token, cash, rank) => {
    this.setState({
      isAuthenticated: authenticated,
      username: username,
      user_id: id,
      avatar: avatar,
      cash: cash,
      rank: rank
    });
    localStorage.setItem('token', token);
  }

  // for our app, to be "logged out" is to remove the token
  handleLogout = () => {
  let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/rest-auth/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },

    })
    .then(handleErrors)
    .catch(error => alert(error));

    this.setState({
      isAuthenticated: false,
      username: '',
      user_id: null,
      avatar: '',
      cash: null
    });
    localStorage.removeItem('token');
    this.props.history.push("/");
  }

  render() {
    const childProps = {
      username: this.state.username,
      user_id: this.state.user_id,
      avatar: this.state.avatar,
      cash: parseFloat(this.state.cash),
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
        <NavBar
          isAuthenticated={this.state.isAuthenticated}
          cash={this.state.cash}
          username={this.state.username}
          rank={this.state.rank}
          avatar={this.state.avatar}
          handleLogout={this.handleLogout}
        />
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

export default withRouter (App);
