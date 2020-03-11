import React from 'react';
import {Table, Modal, Button} from "react-bootstrap";
import "./InfoAlarmsList.css";

const InfoAlarmsList = ({asset, assetType, alarm_type, list_alarms, selected, threshold, alarm_price,
handleBack, handleClick, handleSubmit}) => {
    if(selected) {
            return(
            <div className="InfoAlarmsList">
                <Modal show={true} onHide={handleBack} >
                      <Modal.Header closeButton>
                        <Modal.Title>Eliminar Alarma</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                            <p>Activo: {asset}</p>
                            <p>Tipo de precio: {(alarm_price === "BUY") ? "Compra" : "Venta"}</p>
                            <p>Tipo de alarma: {(alarm_type === "HIGH") ? "Alta" : "Baja"}</p>
                            <p>Umbral: ${threshold}</p>
                            <p>¿Desea dar de baja la alarma sobre el activo {asset}, con umbral {threshold}?</p>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                            block
                            bsSize="large"
                            onClick={handleBack}
                          >
                            Cancelar
                          </Button>
                        <Button bsStyle="danger"
                            block
                            bsSize="large"
                            onClick={handleSubmit}
                          >
                            Eliminar
                          </Button>
                      </Modal.Footer>
                </Modal>
            </div>
            );
    } else {
        if(Object.keys(list_alarms).length === 0) {
            return(
            <div className="InfoAlarmsList">
                <h1 align="center">Lista de Alarmas Activas</h1>
                <p align="center">No hay alarmas activas</p>
                <form>
                    <Button
                    bsStyle="info"
                    href="/alarms"
                    block
                    bsSize="large"
                    >
                    Crear alarmas
                    </Button>
                </form>
            </div>
            );
        } else {
            return (
              <div className="InfoAlarmsList">
                <h1 align="center">Lista de Alarmas Activas</h1>
                <div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Activo</th>
                          <th scope="col">Tipo Precio</th>
                          <th scope="col">Tipo Alarma</th>
                          <th scope="col">Umbral</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {list_alarms.map((wlt) =>
                            <tr key={"row"+wlt.id}>
                              <td>{wlt.asset__name}</td>
                              <td>{(wlt.alarm_price === "BUY") ? "Compra" : "Venta"}</td>
                              <td>{(wlt.alarm_type === "HIGH") ? "Alta" : "Baja"}</td>
                              <td>${wlt.threshold}</td>
                              <td>
                                <Button
                                bsStyle="danger"
                                id={wlt.id}
                                asset={wlt.asset__name}
                                aprice={wlt.alarm_price}
                                atype={wlt.alarm_type}
                                threshold={wlt.threshold}
                                onClick={handleClick}
                                >Eliminar
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

export default InfoAlarmsList;