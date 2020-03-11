import React, { Component } from "react";
import LoginForm from "../components/auth/LoginForm";

/*
* This component is a 'Container' that handles all the login logic
* as we try to have our presentating components as stateless functions,
* even the form validation is handled at this level.
*
* Note that the form fields in LoginForm are populated with the contents
* of his Container parent state, and updated on each render. This is made by
* passing this props down into LoginForm, along with a method to update the state
* when the form changes
*/
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      username: "",
      password: ""
    };
  }

  // this component redirects to Home if an user is already logged in
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  // validation for the form fields
  validateForm(username, password) {
    return (username && username.length > 0) && (password && password.length > 0);
  }

  // clicking produces an event. We capture the event parameters to get the correct
  // field value. If we name the input id properly we can use the same function to
  // update every state field
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  // submit uses the Container state to generate the data payload for the API call
  // as we handle the complete login state in the container, we don't have the need to
  // use the form input elemets value
  handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    submitEvent.preventDefault();

    this.setState({isLoading: true});

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      if (json.user && json.user.username && json.user.id && json.key) {
        this.props.userHasAuthenticated(true, json.user.username, json.user.id, json.user.avatar, json.key, json.user.cash, json.user.rank);
        this.props.history.push("/");
      }
    })
    .catch(error => {
        alert("Usuario y/o contraseña incorrecta");
        this.setState({isLoading: false});
        })
  }

  render() {
    return (
      <LoginForm
        username={this.state.username}
        password={this.state.password}
        handleChangeUsername={e => this.handleChange(e)}
        handleChangePassword={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        validate={this.validateForm}
        isLoading={this.state.isLoading}
      />
    );
  }
}
