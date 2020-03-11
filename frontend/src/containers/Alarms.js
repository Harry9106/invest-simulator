import React, { Component } from "react";
import InfoAlarms from "../components/info/InfoAlarms";


export default class Alarms extends Component {
  constructor(props) {
    super(props);

    this.state = {
        assetId: null,
        asset: null,
        assetType: null,
        alarm_type: 'HIGH',
        alarm_price: 'BUY',
        sale_price: null,
        purchase_price: null,
        threshold: 0,
        list_assets: [],
        selected: false,
    };
  }

  /*Controlador de los estados que involucran a la elección de un asset*/
  handleClick = (data) => {
    data.preventDefault();
    let a = data.currentTarget.getAttribute('asset');
    let aid = data.currentTarget.getAttribute('aid');
    let type = data.currentTarget.getAttribute('atype');
    let sp = data.currentTarget.getAttribute('sale_price');
    let pp = data.currentTarget.getAttribute('purchase_price');
    this.setState({assetId: aid, asset: a, assetType: type, sale_price: sp, purchase_price: pp, selected: true});
  }

  /*Reinicio del estado de selected*/
  handleBack(){
    this.setState({selected: false})
  }

  /*Comprobación de la valides del umbral escogido.*/
  validateForm(threshold) {
    let nthreshold = parseFloat(threshold)
    if (nthreshold < 0) {
        this.setState({threshold: 0});
        alert("Solo numeros positivos");
        }
    return (threshold && nthreshold > 0);
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

  /*Se crea un json con la información de la alarma y
  es enviado a través de un método post al endpoint alarms/alarm.
  Si la respuesta es afirmativa, se muestra un mensaje por pantalla.*/
  handleSubmit(submitEvent) {

    let data = {
        asset: this.state.assetId,
        alarm_type: this.state.alarm_type,
        alarm_price: this.state.alarm_price,
        threshold: parseFloat(this.state.threshold).toFixed(2),
        status: this.setStatus(),
        user: this.props.user_id
    };

    submitEvent.preventDefault();

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/alarms/alarm/', {
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
            alert("Alarma creada con exito!")
            window.location.reload();
        }
    })
    .catch(error => alert(error));
  }

  setStatus() {
    var res = false;

    if (this.state.alarm_price === 'BUY') {
        if (this.state.alarm_type === 'HIGH' && this.state.threshold >= this.state.purchase_price)
        {res = true;}
    if (this.state.alarm_type === 'LOW' && this.state.threshold <= this.state.purchase_price)
        {res = true;}
    }
    if (this.state.alarm_price === 'SELL') {
        if (this.state.alarm_type === 'HIGH' && this.state.threshold >= this.state.sale_price)
        {res = true;}
    if (this.state.alarm_type === 'LOW' && this.state.threshold <= this.state.sale_price)
        {res = true;}
    }
    return res;
  }

  render() {
    return (
      <InfoAlarms
        asset={this.state.asset}
        assetType={this.state.assetType}
        alarm_type={this.state.alarm_type}
        sale_price={this.state.sale_price}
        purchase_price={this.state.purchase_price}
        threshold={this.state.threshold}
        list_assets={this.state.list_assets}
        selected={this.state.selected}
        handleClick={e => this.handleClick(e)}
        handleBack={e => this.handleBack(e)}
        validate={e => this.validateForm(e)}
        handleChangeThreshold={e => this.handleChange(e)}
        handleChangeAlarm={e => this.handleChange(e)}
        handleChangePrice={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
      />
    );
  }
}