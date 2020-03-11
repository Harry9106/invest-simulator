import React, { Component } from "react";
import InfoTransaction from "../components/info/InfoTransaction";


export default class TransactionHistorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investment: [],
      iPk: null,
    };
  }

  /*Creación del componente con los elementos extraídos por fetch.*/
  componentDidMount() {
    if (!this.props.isAuthenticated) {
        this.props.history.push("/");
    }
    else {

      let handleErrors = response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      fetch('http://localhost:8000/api/v1/users/transaction/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json =>{
        this.setState({investment: json});
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  /*Crea un json que es enviado al servidor con la información
   actualizada sobre la visibilidad de la transacción .*/
  handleClick = (event) => {
    let data = {
        pk: parseInt(event.currentTarget.getAttribute('iid'))
    };

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/users/transaction/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(response => {
        if (response.ok) {
            alert("Visibilidad modificada con exito!")
            window.location.reload();
        }
    })
    .catch(error => alert(error));
  }

  render() {
    return (
      <InfoTransaction
        investment={this.state.investment}
        handleClick={e => this.handleClick(e)}
      />
    );
  }
}