import React, { Component } from "react";
import InfoPublicInvestments from "../components/info/InfoPublicInvestments";


export default class PublicInvestments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      investment: []
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

      fetch('http://localhost:8000/api/v1/users/public/', {
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

  render() {
    return (
      <InfoPublicInvestments
        investment={this.state.investment}
      />
    );
  }
}