import React, { Component } from "react";
import InfoSellAssets from "../components/info/InfoSellAssets";


export default class SellAssets extends Component {
  constructor(props) {
    super(props);

    this.countDown = this.countDown.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinalizar = this.handleFinalizar.bind(this);

    this.state = {
      wallet: [],
      confirmation: false,
      quote: 0,
      assetId: null,
      asset: null,
      assetType: null,
      buy_price: 0.0,
      sell_price: 0.0,
      selected: false,
      quantity: 0,
      max: 0,
      show: false,
      time: 5,
      timer: null,
      total: null
    };
  }

  /*Reinicio del estado de selected*/
  handleBack(){
    this.setState({selected: false})
  }

  /*Reinicio de los estados de show y time*/
  handleClose() {
    this.setState({show: false, time: 5});
    clearInterval(this.state.timer);
  }

  /*Controla la finalización de la operación y redirecciona al home.*/
  handleFinalizar() {
    this.handleClose()
    window.location.reload();
  }

  handleShow() {
    this.setState({show: true });
    this.setState({timer: setInterval(this.countDown, 1000)});
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.time - 1;
    this.setState({
      time: seconds
    });

    // Check if we're at zero.
    if (seconds === 0) {
        this.handleClose();
    }
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
        var quote = 0;

        json.forEach((item) => {
          quote += item.amountSum * item.asset__buy;
        });

        this.setState({
          quote: quote,
          wallet: json
        });
      })
      .catch(error => {
        alert(error);
      });
    }
  }

  /*Controlador de los estados que involucran a la elección de un asset*/
  handleClick = (data) => {
    data.preventDefault();
    let aid = data.currentTarget.getAttribute('aid')
    let a = data.currentTarget.getAttribute('asset');
    let type = data.currentTarget.getAttribute('atype');
    let sp = data.currentTarget.getAttribute('sell_price');
    let bp = data.currentTarget.getAttribute('buy_price');
    let q = data.currentTarget.getAttribute('quantity');
    this.setState({assetId: aid, asset: a, assetType: type, sell_price: sp, buy_price: bp, max: q, selected: true});
  }

  /*Se crea un json con la información del activo seleccionado y
  es enviado a través de un método post al endpoint wallet.
  Si la respuesta es afirmativa.*/
  handleSubmit(submitEvent) {

    this.handleClose();

    let data = {
        asset: parseInt(this.state.assetId),
        old_buy: parseFloat(this.state.buy_price),
        old_sell: parseFloat(this.state.sell_price),
        amount: (parseFloat(this.state.quantity).toFixed(2)),
        type: "SELL",
        user: this.props.user_id,
        visible: false
    };

    submitEvent.preventDefault();

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/api/v1/users/wallet/', {
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
            this.setState({confirmation: true})
        }
    })
    .catch(error => alert(error));
  }

  /*Comprobación de la valides de la cantidad escogida.*/
  validateForm(quantity) {
    let nquantity = parseFloat(quantity)
    if (nquantity < 0) {alert("Solo numeros positivos")}
    if (nquantity > this.state.max) {alert("No dispone de tantos activos")}
    return (quantity && nquantity > 0 && nquantity <= this.state.max);
  }

  /*Contralador de los cambio de estado.*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  multdec ( val1, val2 ) {
    val1 = Math.floor(val1 * 100) / 100
    val2 = Math.floor(val2 * 100) / 100
    val1 = val1 * 100
    val2 = val2 * 100
    let val3 = (val1*val2) / 10000
    val3 = Math.floor(val3 * 100) / 100
    return val3;
    }

  render() {

    return (
      <InfoSellAssets
        asset={this.state.asset}
        assetType={this.state.assetType}
        confirmation={this.state.confirmation}
        wallet={this.state.wallet}
        quote={(this.state.quote + this.props.cash).toFixed(2)}
        total={this.multdec(this.state.quantity, this.state.buy_price)}
        cash={(this.props.cash).toFixed(2)}
        max={this.state.max}
        price={this.state.buy_price}
        selected={this.state.selected}
        show={this.state.show}
        time={this.state.time}
        validate={this.validateForm}
        quantity={this.state.quantity}
        handleBack={this.handleBack}
        handleClick={e => this.handleClick(e)}
        handleChangeQuantity={e => this.handleChange(e)}
        handleClose={this.handleClose}
        handleShow={this.handleShow}
        handleSubmit={this.handleSubmit}
        handleFinalizar={this.handleFinalizar}
      />
    );
  }
}