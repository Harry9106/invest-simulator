import React, { Component } from "react";
import ListBuy from "../components/info/ListBuy";


export default class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_assets: [],
      confirmation: false,
      total: 0.0,
      assetId: null,
      asset: null,
      assetType: null,
      sale_price: 0.0,
      buy_price: 0.0,
      selected: false,
      quantity: parseFloat(0.00),
      show: false,
      time: 5,
      timer: null,
      visible: false,
    };

    this.countDown = this.countDown.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFinalizar = this.handleFinalizar.bind(this);

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

  /*Controla la finalización de la operación.*/
  handleFinalizar() {
    this.handleClose()
    window.location.reload();
  }

  handleShow() {
    this.setState({show: true});
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

  /*Comprobación de la valides de la cantidad escogida.*/
  validateForm(quantity) {
    let nquantity = parseFloat(quantity)
    if (nquantity < 0)
        {alert("Solo numeros positivos")}
    if (nquantity * this.state.sale_price > this.props.cash)
        {alert("No dispone de dinero suficiente para comprar " + nquantity + " activos")}
    return (quantity && nquantity > 0 && (nquantity * this.state.sale_price <= this.props.cash));
  }

  /*Contralador de los cambio de estado.*/
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  /*Controlador del cambio de estado de visible*/
  handleCheck = event => {
    this.setState({visible: event.target.checked})
  }

  /*Controlador de los estados que involucran a la elección de un asset*/
  handleClick = (data) => {
    data.preventDefault();
    let aid = data.currentTarget.getAttribute('aid');
    let a = data.currentTarget.getAttribute('asset');
    let type = data.currentTarget.getAttribute('atype');
    let sp = parseFloat(data.currentTarget.getAttribute('sale_price'));
    let bp = parseFloat(data.currentTarget.getAttribute('buy_price'));
    this.setState({assetId: aid, asset: a, assetType: type, sale_price: sp, buy_price: bp, selected: true});
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

  /*Se crea un json con la información del activo seleccionado y
  es enviado a través de un método post al endpoint wallet.
  Si la respuesta es afirmativa, se procede a actualizar el dinero
  en liquido del usuario.*/
  handleSubmit(submitEvent) {

    let data = {
        asset: parseInt(this.state.assetId),
        old_buy: parseFloat(this.state.buy_price),
        old_sell: parseFloat(this.state.sale_price),
        amount: parseFloat(this.state.quantity).toFixed(2),
        type: "BUY",
        user: this.props.user_id,
        visible: this.state.visible
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
      <ListBuy
        list_assets={this.state.list_assets}
        asset={this.state.asset}
        assetType={this.state.assetType}
        confirmation={this.state.confirmation}
        total={this.multdec(this.state.quantity, this.state.sale_price)}
        cash={(this.props.cash).toFixed(2)}
        buy_price={this.state.buy_price}
        sale_price={this.state.sale_price}
        selected={this.state.selected}
        show={this.state.show}
        time={this.state.time}
        validate={this.validateForm}
        visible={this.state.visible}
        quantity={this.state.quantity}
        handleBack={this.handleBack}
        handleClick={e => this.handleClick(e)}
        handleChange={e => this.handleChange(e)}
        handleCheck={e => this.handleCheck(e)}
        handleClose={this.handleClose}
        handleShow={this.handleShow}
        handleSubmit={this.handleSubmit}
        handleFinalizar={this.handleFinalizar}
      />
    );
  }
}