import React, { Component } from "react";
import EditProfileForm from "../components/profile/EditProfileForm";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      original_email: '',
      email: '',
      first_name: '',
      last_name: '',
      avatar: '',
      avatarSelected: null,
    };
  }

  /*Creación del componente con los elementos extraídos por fetch.*/
  componentDidMount() {

    if (!this.props.isAuthenticated) {
      this.props.history.push("/");
    } else {

        let handleErrors = response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }

            return response;
        };

        fetch('http://127.0.0.1:8000/api/v1/users/profile/', {
            method: 'GET',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then(handleErrors)
          .then(res => res.json())
          .then(json => {
              this.setState({
                  original_email: json.email,
                  email: json.email,
                  first_name: json.first_name,
                  last_name: json.last_name,
                  avatar: json.avatar
              });
          }).catch(error => alert(error));
    }
  }

  /*Comprobación de la valides del email.*/
  validateForm(email, first_name, last_name) {
    return (email && email.length > 0);
  }

  /*Contralador de los cambio de estado.*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /*Crea un json que es enviado al servidor con la información de
   de los datos actualizada.*/
  handleSubmit(submitEvent) {

    let data = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      avatar: this.state.avatar
    };

    submitEvent.preventDefault();

    fetch('http://127.0.0.1:8000/api/v1/users/profile/edit/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        alert("Se guardo el perfil correctamente");
        window.location.reload();
        this.props.history.push("/");
      } else {
          response.json().then( json => {
                  let errors = "";

                  if(json.email) {
                      errors += "Email: \n";
                      json.email.forEach( error => errors +=  error + "\n");
                  }
                  if(json.first_name) {
                      errors += "First Name: \n";
                      json.first_name.forEach(error => errors += error + "\n");
                  }
                  if(json.last_name) {
                      errors += "Last Name: \n";
                      json.last_name.forEach(error => errors += error + "\n");
                  }
                  if(json.avatar) {
                      errors += "Avatar: \n";
                      json.avatar.forEach(error => errors += error + "\n");
                  }

                  alert(errors);
              }
          ).catch(error => alert(error));
      }
    })
  }

  render() {
    return (
          <EditProfileForm
            email={this.state.email}
            first_name={this.state.first_name}
            last_name={this.state.last_name}
            avatar={this.state.avatar}
            handleChangeEmail={e => this.handleChange(e)}
            handleChangeName={e => this.handleChange(e)}
            handleChangelast_name={e => this.handleChange(e)}
            handleChangeAvatar ={ avatar => this.setState({avatar: avatar})}
            handleSubmit={e => this.handleSubmit(e)}
            validate={this.validateForm}
          />
    );
  }
}
