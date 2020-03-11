import React, { Component } from "react";
import ListAsset from "../components/info/ListAsset";


export default class Asset extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: []
    };
  }

  /*Creación del componente con los elementos extraídos por fetch.*/
  componentDidMount() {
    if (this.props.isAuthenticated) {
      let aux = [];
      let handleErrors = response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      fetch('http://localhost:8000/api/v1/assets/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        json.forEach((item) => {
          if(item.buy != null && item.sell != null) {
            aux.push(item);
          };
        });
        this.setState({assets: aux});
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  render() {
    return (
      <ListAsset
        assets={this.state.assets}
      />
    );
  }
}