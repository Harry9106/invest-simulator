import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Button, Table } from "react-bootstrap";
import {LineChart} from 'react-easy-chart';
import "./InfoAssetHistory.css";

const InfoAssetHistory = ({list_assets, asset_name, historyX, historyY, startDate, endDate, selected, confirm, handleChangeStart,
 handleChangeEnd, handleClick, handleBack, validateForm, handleSubmit}) => {
    if(selected) {
        if(confirm) {
            if(Object.keys(historyX).length === 0 || Object.keys(historyY).length === 0) {
                return(
                <div className="InfoAssetHistory">
                    <form>
                        <h1 align="center">Valor Historico</h1>
                        <h3 align="center">No hay datos historicos para el activo seleccionado</h3>
                        <Button
                            block
                            bsStyle="info"
                            bsSize="large"
                            onClick={handleBack}
                            >
                            Ver Historial
                        </Button>
                        <Button
                            block
                            bsStyle="info"
                            bsSize="large"
                            href="/"
                            >
                            Volver al inicio
                        </Button>
                    </form>
                </div>
                );
            } else {
                return(
                    <div className="InfoAssetHistory">
                        <form align="center">
                            <h1>Valor Historico</h1>
                            <h3>Activo: {asset_name}</h3>
                            <h4>Precio de compra: Azul</h4>
                            <h4>Precio de venta: Rojo</h4>
                            <LineChart
                                axes
                                grid
                                verticalGrid
                                lineColors={['red', 'blue']}
                                xType={'text'}
                                width={500}
                                height={500}
                                data={[historyX, historyY]}
                            />
                            <Button
                                block
                                bsStyle="info"
                                bsSize="large"
                                onClick={handleBack}
                                >
                                Volver Historial
                            </Button>
                            <Button
                                block
                                bsStyle="info"
                                bsSize="large"
                                href="/"
                                >
                                Volver al inicio
                            </Button>
                        </form>
                    </div>
                );
            }
        } else {
            return(
                <div className="InfoAssetHistory">
                    <form onSubmit={handleSubmit} align="center">
                        <h1>Consultar Historial</h1>
                        <h3>Activo: {asset_name}</h3>
                        <div>
                            <h4>Desde</h4>
                            <DateTimePicker
                                required={true}
                                onChange={handleChangeStart}
                                value={startDate}
                            />
                            <h4>Hasta</h4>
                            <DateTimePicker
                                required={true}
                                onChange={handleChangeEnd}
                                value={endDate}
                            />
                        </div>
                        <Button
                            block
                            bsStyle="success"
                            bsSize="large"
                            disabled={!validateForm(startDate, endDate)}
                            type="submit"
                        >
                        Ver Historial
                        </Button>
                        <Button
                            block
                            bsSize="large"
                            onClick={handleBack}
                        >
                        Volver
                        </Button>
                    </form>
                </div>
            );
        }
    } else {
        if(Object.keys(list_assets).length === 0) {
            return(
            <div className="InfoAssetHistory">
                <h1 align="center">Historial de Activos</h1>
                <h3 align="center">No existen activos disponibles</h3>
            </div>
            );
        } else {
            return (
              <div className="InfoAssetHistory">
                <h1 align="center">Historial de Activos</h1>
                <div>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Activo</th>
                          <th scope="col">Tipo</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {list_assets.map((wlt) =>
                            <tr key={"row"+wlt.name}>
                              <td>{wlt.name}</td>
                              <td>{(wlt.type === "SHARE") ? "Accion" : "Divisa"}</td>
                              <td>
                                <Button
                                bsStyle="info"
                                asset_name={wlt.name}
                                onClick={handleClick}
                                >Ver
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

export default InfoAssetHistory;
