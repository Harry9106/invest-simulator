import React, { Component } from "react";
import InfoWallet from "../components/info/InfoWallet";


export default class Wallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: [],
      total: parseFloat(0.00)
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

      fetch('http://localhost:8000/api/v1/users/wallet/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        var total = 0;

        json.forEach((item) => {
          total += item.amountSum * item.asset__buy;
        });

        this.setState({
          total: total,
          wallet: json
        });
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  render() {
    return (
      <InfoWallet
        wallet={this.state.wallet}
        total={(this.state.total + this.props.cash).toFixed(2)}
        cash={(this.props.cash).toFixed(2)}
      />
    );
  }
}