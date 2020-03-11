import React from 'react';
import {Table} from "react-bootstrap";
import "./InfoSellAssets.css";
import { Button, FormGroup, FormControl, ControlLabel, Modal, ProgressBar} from "react-bootstrap";

const InfoSellAssets = ({asset, assetType, confirmation, wallet, quote, cash, max, price, selected, show, quantity,
validate, time, total,
handleBack, handleClick, handleSubmit, handleChangeQuantity, handleClose, handleShow, handleFinalizar}) => {
    if(selected) {
        if (confirmation) {
            return(
            <div className="Resumen">
                <Modal show={true}>
                      <Modal.Header closeButton>
                        <Modal.Title>Resumen de la venta</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Activo vendido: {asset}</p>
                        <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                        <p>Cantidad vendida: {parseFloat(quantity)}</p>
                        <p>Precio: ${price}</p>
                        <p>Total: ${total}</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button bsStyle="info" block bsSize="large" onClick={handleFinalizar}>Finalizar</Button>
                      </Modal.Footer>
                </Modal>
            </div>
            );
        }
        else {
            return(
                <div className="InfoSellAssets">
                    <form onSubmit={handleSubmit}>
                        <h1>Vender Activo</h1>
                            <p>Activo a vender: {asset}</p>
                            <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                            <p>Cantidad disponible: {max}</p>
                            <p>Precio: ${price}</p>
                          <FormGroup controlId="quantity" bsSize="large">
                            <ControlLabel>Cantidad</ControlLabel>
                            <FormControl
                              autoFocus
                              value={quantity}
                              onChange={handleChangeQuantity}
                              type="number"
                              step="0.01"
                            />
                          </FormGroup>
                          <Button bsStyle="success"
                            block
                            bsSize="large"
                            disabled={!validate(quantity)}
                            onClick={handleShow}
                          >
                            Confirmar
                          </Button>
                          <Button
                            block
                            bsSize="large"
                            onClick={handleBack}
                          >
                            Volver
                          </Button>
                    </form>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Vender Activo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Activo a vender: {asset}</p>
                        <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                        <p>Cantidad de activos a vender: {parseFloat(quantity)}</p>
                        <p>Precio: ${price}</p>
                        <p>Total: ${total}</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <ControlLabel>¿Esta seguro que desea realizar la operación?</ControlLabel>
                        <Button bsStyle="success" block bsSize="large" onClick={handleSubmit}>SI</Button>
                        <Button bsStyle="danger" block bsSize="large" onClick={handleClose}>NO</Button>
                        <p>Esta ventana se cerrara en {time} segundos</p>
                        <ProgressBar active now={time*20} label={time} srOnly/>
                      </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    } else {
        if(Object.keys(wallet).length === 0) {
            return(
            <div className="InfoSellAssets">
                <h1 align="center">Vender Activos</h1>
                <p align="center">Dinero liquido: ${cash}</p>
                <p align="center">Cotizacion de cartera: ${quote}</p>
                <p align="center">El usuario no tiene activos disponibles</p>
                <form>
                    <Button
                    bsStyle="info"
                    href="/buy"
                    block
                    bsSize="large"
                    >
                    Comprar Activos
                    </Button>
                </form>
            </div>
            );
        } else {
            return (
              <div className="InfoSellAssets">
                <h1 align="center">Vender Activos</h1>
                <div>
                    <p>Dinero liquido: ${cash}</p>
                    <p>Cotizacion de cartera: ${quote}</p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Activo</th>
                          <th scope="col">Tipo</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Precio de Compra</th>
                          <th scope="col">Precio de Venta</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {wallet.map((wlt) =>
                            <tr key={"row"+wlt.asset__name}>
                              <td>{wlt.asset__name}</td>
                              <td>{(wlt.asset__type === "SHARE") ? "Accion" :"Divisa"}</td>
                              <td>{wlt.amountSum}</td>
                              <td>${wlt.asset__buy}</td>
                              <td>${wlt.asset__sell}</td>
                              <td>
                                <Button
                                bsStyle="info"
                                aid={wlt.asset}
                                asset={wlt.asset__name}
                                atype={wlt.asset__type}
                                buy_price={wlt.asset__buy}
                                sell_price={wlt.asset__sell}
                                quantity={wlt.amountSum}
                                onClick={handleClick}
                                >Vender
                                </Button>
                              </td>
                            </tr>
                            )}
                      </tbody>
                    </Table>
                </div>
              </div>
            );
        }

    }
}

export default InfoSellAssets;