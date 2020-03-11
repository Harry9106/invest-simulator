import React, { Component } from "react";
import SignupForm from "../components/auth/SignupForm";


/*
* Except for the API call, this component behaves exactly like the Login component
* eventually we'll' want to have different business logic and information
* between the Login and Signup flows
*/
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      email2: "",
      password1: "",
      password2: "",
      name: "",
      last_name: "",
      avatar:"",
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validateForm(username, email,email2, password1, password2,name,last_name) {
    return (username && username.length > 0)
    && (email && email.length > 0 && email2.length > 0)
		&& (email === email2)
    && (password1 && password1.length > 0)
    && (password2 === password1);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      email: this.state.email,
      email2:this.state.email2,
      password1: this.state.password1,
      password2: this.state.password2,
      first_name : this.state.name,
      last_name: this.state.last_name,
      avatar : this.state.avatar.value
    };

    submitEvent.preventDefault();

    fetch('http://127.0.0.1:8000/api/v1/users/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if(json.username){
        if (json.username.includes("A user with that username already exists."))
            alert("Ya existe un usuario con ese username.")
      }
      if(json.email){
        if (json.email.includes("Enter a valid email address."))
            alert("Ingrese una direccion de correo electronico valida.")
        if (json.email.includes("A user is already registered with this e-mail address."))
            alert("Ya existe un usuario registrado con esa direccion de correo electronico")
      }
      if(json.password1) {
        if (json.password1.includes("This password is too short. It must contain at least 8 characters."))
            alert("El password es muy corto. Debe contener al menos 8 caracteres.")
        if (json.password1.includes("This password is too common."))
            alert("El password es muy comun.")
      }
      if(json.first_name) {
        alert("El nombre no puede estar vacio")
      }
      if(json.last_name) {
        alert("El apellido no puede estar vacio")
      }
      if (json.avatar){
        alert("Elija un avatar")
      }
      if ("key" in json && "user" in json){
        alert("Usuario registrado exitosamente!")
        this.props.history.push("/")
      }
    })
  }

  render() {
    return (
          <SignupForm
            username={this.state.username}
            email={this.state.email}
            email2={this.state.email2}
            password1={this.state.password1}
            password2={this.state.password2}
            name={this.state.name}
            last_name={this.state.last_name}
            avatar={this.state.avatar}
            handleChangeUsername={e => this.handleChange(e)}
            handleChangeEmail={e => this.handleChange(e)}
            handleChangeEmail2={e => this.handleChange(e)}
            handleChangePassword={e => this.handleChange(e)}
            handleChangePassword2={e => this.handleChange(e)}
            handleChangeName={e => this.handleChange(e)}
            handleChangelast_name={e => this.handleChange(e)}
            handleChangeAvatar ={avatar => this.setState({avatar})}
            handleSubmit={e => this.handleSubmit(e)}
            validate={this.validateForm}
          />
    );
  }
}
