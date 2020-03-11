import React, { Component } from "react";
import InfoRanking from "../components/info/InfoRanking";


export default class Ranking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: []
    };
  }

  componentWillMount() {

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

      fetch('http://localhost:8000/api/v1/users/ranking/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        console.log("json" + json);
        this.setState({
          ranking: json
        });
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  componentDidUpdate() {
      var selected = document.getElementById("selected-current-username");

      if(selected) {
          selected.scrollIntoView({
              behavior: "smooth",
              block:    "start",
          });
      }
  }

  render() {
    return (
      <InfoRanking
        ranking={this.state.ranking}
        current_username={this.props.username}
      />
    );
  }
}