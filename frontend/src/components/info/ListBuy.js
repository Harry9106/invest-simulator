import React from 'react';
import {Checkbox, Table, Modal, Button, FormGroup, FormControl, ControlLabel, ProgressBar} from "react-bootstrap";
import "./ListBuy.css";

const ListBuy = ({asset, assetType, confirmation, list_assets, total, cash, max, buy_price, sale_price, selected, show,
quantity, validate, time, visible,
handleBack, handleClick, handleSubmit, handleChange, handleCheck, handleClose, handleShow, handleFinalizar}) => {
    if(selected) {
        if (confirmation) {
            return(
            <div className="Resumen">
                <Modal show={true}>
                      <Modal.Header closeButton>
                        <Modal.Title>Resumen de la compra</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Activo comprado: {asset}</p>
                        <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                        <p>Cantidad comprada: {(parseFloat(quantity)).toFixed(2)}</p>
                        <p>Precio de compra: ${buy_price}</p>
                        <p>Precio de venta: ${sale_price}</p>
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
                <div className="ListBuy">
                    <form onSubmit={handleSubmit}>
                        <h1>Comprar Activo</h1>
                            <p>Activo a comprar: {asset}</p>
                            <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                            <p>Dinero liquido: ${cash}</p>
                            <p>Precio de compra: ${buy_price}</p>
                            <p>Precio de venta: ${sale_price}</p>
                          <FormGroup controlId="quantity" bsSize="large">
                            <ControlLabel>Cantidad</ControlLabel>
                            <FormControl
                              autoFocus
                              value={quantity}
                              onChange={handleChange}
                              type="number"
                              step=".01"
                            />
                          </FormGroup>
                          <FormGroup controlId="visible" bsSize="large">
                            <Checkbox
                                checked={visible}
                                onChange={handleCheck}
                            >
                              Transaccion publica
                            </Checkbox>
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
                        <Modal.Title>Comprar Activo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Activo a comprar: {asset}</p>
                        <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" :"Divisa"}</p>
                        <p>Cantidad de activos a comprar: {(parseFloat(quantity)).toFixed(2)}</p>
                        <p>Precio de compra: ${buy_price}</p>
                        <p>Precio de venta: ${sale_price}</p>
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
        if(Object.keys(list_assets).length === 0) {
            return(
            <div className="ListBuy">
                <h1 align="center">Comprar Activos</h1>
                <p align="center">Dinero liquido: ${cash}</p>
                <p align="center">No hay activos disponibles para la compra</p>
            </div>
            );
        } else {
            return (
              <div className="ListBuy">
                <h1 align="center">Comprar Activos</h1>
                <h2 align="center">Dinero liquido: ${cash}</h2>
                <div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Activo</th>
                          <th scope="col">Tipo</th>
                          <th scope="col">Precio de Compra</th>
                          <th scope="col">Precio de Venta</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {list_assets.map((wlt) =>
                            <tr key={"row"+wlt.name}>
                              <td>{wlt.name}</td>
                              <td>{(wlt.type === "SHARE") ? "Accion" :"Divisa"}</td>
                              <td>${wlt.buy}</td>
                              <td>${wlt.sell}</td>
                              <td>
                                <Button
                                bsStyle="info"
                                aid={wlt.id}
                                asset={wlt.name}
                                atype={wlt.type}
                                buy_price={wlt.buy}
                                sale_price={wlt.sell}
                                onClick={handleClick}
                                >Comprar
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

export default ListBuy;