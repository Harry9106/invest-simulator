import React from 'react';
import {Button, Table} from "react-bootstrap";
import "./InfoWallet.css";

const InfoWallet = ({wallet, total, cash}) => {
    if(Object.keys(wallet).length === 0) {
        return(
            <div className="InfoWallet">
                <h1 align="center">Cartera de Inversiones</h1>
                <p align="center">Dinero liquido: ${cash}</p>
                <p align="center">Dinero Total: ${total}</p>
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
              <div className="InfoWallet">
                <h1 align="center">Cartera de Inversiones</h1>
                <div>
                    <p>Dinero liquido: ${cash}</p>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th scope="col">Activo</th>
                          <th scope="col">Tipo</th>
                          <th scope="col">Cantidad</th>
                          <th scope="col">Precio de Compra</th>
                          <th scope="col">Precio de Venta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wallet.map((wlt) =>
                            <tr key={"row"+wlt.asset__name}>
                              <td>{wlt.asset__name}</td>
                              <td>{(wlt.asset__type === "SHARE") ? "Accion" : "Divisa"}</td>
                              <td>{wlt.amountSum}</td>
                              <td>${wlt.asset__buy.toFixed(2)}</td>
                              <td>${wlt.asset__sell.toFixed(2)}</td>
                            </tr>
                            )}
                      </tbody>
                    </Table>
                    <p>Dinero Total: ${total}</p>
                </div>
              </div>
            );
        }
}

export default InfoWallet;