import React, { Component } from "react";
import InfoAlarmsList from "../components/info/InfoAlarmsList";


export default class AlarmsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id: null,
        asset: null,
        assetType: null,
        alarm_price: 'BUY',
        alarm_type: 'HIGH',
        sale_price: null,
        purchase_price: null,
        threshold: 0,
        list_alarms: [],
        selected: false,
    };
  }

  /*Controlador de los estados que involucran a la elección de una alarma*/
  handleClick = (data) => {
    data.preventDefault();
    let id = data.currentTarget.getAttribute('id')
    let a = data.currentTarget.getAttribute('asset');
    let ap = data.currentTarget.getAttribute('aprice')
    let type = data.currentTarget.getAttribute('atype');
    let tr = data.currentTarget.getAttribute('threshold');
    this.setState({id: id, asset: a, alarm_price: ap, alarm_type: type, threshold: tr, selected: true});
  }

  /*Reinicio del estado de selected*/
  handleBack(){
    this.setState({selected: false})
  }

  /*Contralador de los cambio de estado.*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
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

      fetch('http://localhost:8000/api/v1/alarms/list/', {
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        json.forEach((item) => {
            aux.push(item);
        });
        this.setState({list_alarms: aux});
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  /*Se crea un json con la información de la alarma que se desea eliminar y
  es enviado a través de un método post al endpoint alarms/list.
  Si la respuesta es afirmativa, se muestra un mensaje por pantalla.*/
  handleSubmit(submitEvent) {

    let data = {
        pk: this.state.id,
    };

    submitEvent.preventDefault();

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/alarms/list/', {
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
            alert("Alarma eliminada con exito!")
            window.location.reload();
        }
    })
    .catch(error => alert(error));
  }

  render() {
    return (
      <InfoAlarmsList
        asset={this.state.asset}
        assetType={this.state.assetType}
        alarm_price={this.state.alarm_price}
        alarm_type={this.state.alarm_type}
        threshold={this.state.threshold}
        list_alarms={this.state.list_alarms}
        selected={this.state.selected}
        handleClick={e => this.handleClick(e)}
        handleBack={e => this.handleBack(e)}
        handleChangeThreshold={e => this.handleChange(e)}
        handleChangeAlarm={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
      />
    );
  }
}