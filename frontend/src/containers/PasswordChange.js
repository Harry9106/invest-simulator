import React, { Component } from "react";
import PasswordChangeForm from "../components/auth/PasswordChangeForm";


export default class PasswordChange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      old_password: "",
      new_password1: "",
      new_password2: ""
    };
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  /*Contralador de los cambio de estado.*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /*Crea un json que es enviado al servidor con la información de
   de la nueva contraseña actualizada.*/
  handleSubmit(submitEvent) {
    let data = {
      old_password: this.state.old_password,
      new_password1: this.state.new_password1,
      new_password2: this.state.new_password2
    };

    submitEvent.preventDefault();

    fetch('http://localhost:8000/api/v1/rest-auth/password/change/', {
      method: 'POST',
      credentials: "same-origin",
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      if (json.detail) {
        alert("El nuevo password ha sido guardado.");
        this.props.history.push("/");
      }
      else {
          if (json.old_password) {
            if (json.old_password.includes("This field may not be blank."))
                alert("El campo 'Password actual' no puede estar vacio.")
            if (json.old_password.includes("Invalid password"))
                alert("Password actual invalida")
            }
          if (json.new_password1)
            if (json.new_password1.includes("This field may not be blank."))
                alert("El campo 'Password nueva' no puede estar vacio.")
          if (json.new_password2) {
            if (json.new_password2.includes("This password is too short. It must contain at least 8 characters."))
                alert("El password es muy corto. Debe contener al menos 8 caracteres.")
            if (json.new_password2.includes("This password is too common."))
                alert("El password es muy comun.")
            if (json.new_password2.includes("This field may not be blank."))
                alert("El campo 'Repetir password nueva' no puede estar vacio.")
            if (json.new_password2.includes("The password is too similar to the email address."))
                alert("El nuevo password es muy similar al correo electronico.")
            if (json.new_password2.includes("The two password fields didn't match."))
                alert("Los passwords nuevos no coinciden entre ellos.")
        }

      }
    })
  }

  render() {
    return (
      <PasswordChangeForm
        old_password={this.state.old_password}
        new_password1={this.state.new_password1}
        new_password2={this.state.new_password2}
        handleChangePassword={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
      />
    );
  }
}