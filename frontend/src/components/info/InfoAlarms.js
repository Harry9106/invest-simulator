import React from 'react';
import {Table, Modal, Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "./InfoAlarms.css";

const InfoAlarms = ({asset, assetType, alarm_type, list_assets, purchase_price, sale_price, selected,
threshold, validate, alarm_price, handleChangePrice,
handleBack, handleClick, handleSubmit, handleChangeThreshold, handleChangeAlarm}) => {
    if(selected) {
            return(
            <div className="Resumen">
                <Modal show={true} onHide={handleBack} >
                      <Modal.Header closeButton>
                        <Modal.Title>Configurar Alarma</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                            <p>Activo: {asset}</p>
                            <p>Tipo de activo: {(assetType === "SHARE") ? "Accion" : "Divisa"}</p>
                            <p>Precio de compra: ${purchase_price}</p>
                            <p>Precio de venta: ${sale_price}</p>
                            <FormGroup controlId="alarm_price">
                              <ControlLabel>Precio</ControlLabel>
                              <FormControl
                              componentClass="select"
                              placeholder="select"
                              autoFocus
                              value={alarm_price}
                              onChange={handleChangePrice}
                              >
                                <option value="BUY">Compra</option>
                                <option value="SELL">Venta</option>
                              </FormControl>
                            </FormGroup>
                            <FormGroup controlId="alarm_type">
                              <ControlLabel>Tipo de Alarma</ControlLabel>
                              <FormControl
                              componentClass="select"
                              placeholder="select"
                              value={alarm_type}
                              onChange={handleChangeAlarm}
                              >
                                <option value="HIGH">Alta</option>
                                <option value="LOW">Baja</option>
                              </FormControl>
                            </FormGroup>
                            <FormGroup controlId="threshold" bsSize="large">
                            <ControlLabel>Umbral</ControlLabel>
                            <FormControl
                              value={threshold}
                              onChange={handleChangeThreshold}
                              type="number"
                              step=".01"
                            />
                            </FormGroup>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button bsStyle="success"
                            block
                            bsSize="large"
                            disabled={!validate(threshold)}
                            onClick={handleSubmit}
                          >
                            Confirmar
                          </Button>
                      </Modal.Footer>
                </Modal>
            </div>
            );
    } else {
        if(Object.keys(list_assets).length === 0) {
            return(
            <div className="InfoAlarms">
                <h1 align="center">Configurar Alarma</h1>
                <p align="center">No hay activos disponibles</p>
            </div>
            );
        } else {
            return (
              <div className="InfoAlarms">
                <h1 align="center">Configurar Alarma</h1>
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
                      <tbody align="center">
                        {list_assets.map((wlt) =>
                            <tr key={"row"+wlt.name}>
                              <td>{wlt.name}</td>
                              <td>{(wlt.type === "SHARE") ? "Accion" : "Divisa"}</td>
                              <td>${wlt.buy}</td>
                              <td>${wlt.sell}</td>
                              <td align="center">
                                <Button
                                bsStyle="info"
                                aid={wlt.id}
                                asset={wlt.name}
                                atype={wlt.type}
                                purchase_price={wlt.buy}
                                sale_price={wlt.sell}
                                onClick={handleClick}
                                >Programar
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

export default InfoAlarms;