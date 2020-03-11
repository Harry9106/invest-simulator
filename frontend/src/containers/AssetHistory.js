import React, { Component } from "react";
import InfoAssetHistory from "../components/info/InfoAssetHistory";


export default class AssetHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_assets: [],
      asset_name: null,
      historyX: [],
      historyY: [],
      startDate: null,
      endDate: null,
      selected: false,
      confirm: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.validateForm= this.validateForm.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }

  /*Contralador del cambio de estado de startDate.*/
  handleChangeStart = event => {
    this.setState({
      startDate: event
    });
  }

  /*Contralador del cambio de estado de endDate.*/
  handleChangeEnd = event => {
    this.setState({
      endDate: event
    });
  }

  /*Cambia el estado de asset_name con el nombre del activo elegido, y pone a selected en true.*/
  handleClick = (data) => {
    data.preventDefault();
    let name = data.currentTarget.getAttribute('asset_name');
    this.setState({asset_name: name, selected: true});
  }

  /*Se reinician los estados*/
  handleBack(){
    this.setState({selected: false, confirm: false, startDate: null, endDate: null})
  }

  /*Comprobación de la valides de las fechas escogidas.*/
  validateForm(startDate, endDate) {

    let today = new Date();
    if (endDate < startDate && endDate != null) {alert("Fechas incorrectas")}
    if (today < endDate) {alert("Fechas incorrectas")}
    return (startDate <= endDate && endDate <= today && startDate != null && endDate != null);
  }

  /*Se da formato a las fechas y se llama a la api(bolsa), obteniendo el valor
  histórico de el activo en un tiempo determinado por las fechas.*/
  handleSubmit(submitEvent) {

    submitEvent.preventDefault();
    let start = this.state.startDate.getFullYear() + '-' + (this.state.startDate.getMonth()+1) + '-' +  this.state.startDate.getDate();
    let end = this.state.endDate.getFullYear() + '-' + (this.state.endDate.getMonth()+1) + '-' +  this.state.endDate.getDate();
    let name = this.state.asset_name
    this.setState({confirm: true});

    let aux = [];

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:7000/v1/getassethistory/' + name + '/' + start + '/' + end, {
      method: 'GET',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
        json.forEach((item) => {
            aux.push(item);
        });
        this.historyXandY(aux);
      })
    .catch(error => alert(error));
  }

  /*Se modifica el estado de historyX e historyY con una lista que contiene la información
  necesaria que sera utilizada por el grafico de lineas.*/
  historyXandY(history) {

    let historyX = [];
    let historyY = [];

    history.map((item) =>
      historyX.push({x: item.date, y: parseFloat(item.sell)})
      );
    history.map((item) =>
      historyY.push({x: item.date, y: parseFloat(item.buy)})
      );

    this.setState({historyX: historyX, historyY: historyY});

  }

  /*Creación del componente con los elementos extraídos por fetch.*/
  componentDidMount() {
    if (!this.props.isAuthenticated) {
        this.props.history.push("/");
    }
    else {

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
        this.setState({list_assets: aux});
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  render() {
    return (
      <InfoAssetHistory
        list_assets={this.state.list_assets}
        asset_name={this.state.asset_name}
        historyX={this.state.historyX}
        historyY={this.state.historyY}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        selected={this.state.selected}
        confirm={this.state.confirm}
        handleClick={this.handleClick}
        handleChangeStart={this.handleChangeStart}
        handleChangeEnd={this.handleChangeEnd}
        handleBack={this.handleBack}
        validateForm={this.validateForm}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}