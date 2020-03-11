import React from 'react';
import {Table, Button} from "react-bootstrap";
import "./ListAsset.css";

const ListAsset = ({assets}) => {
    if(Object.keys(assets).length === 0) {
      return (
        <div className="ListAsset">
        <h1 align="center">Cotizaciones de Activos</h1>
            <form>
              <h3 align="center"> No hay activos disponibles </h3>
              <Button
                bsStyle="info"
                href="/"
                block
                bsSize="large"
              >Volver a la pantalla de inicio
              </Button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="ListAsset">
          <h1 align="center">Cotizaciones de Activos</h1>
          <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Precio de Compra</th>
                    <th scope="col">Precio de Venta</th>
                  </tr>
                </thead>
                <tbody>
                    {assets.map((asset) =>
                        <tr key={"row"+asset.name}>
                          <td>{asset.name}</td>
                          <td>{(asset.type === "SHARE") ? "Accion" : "Divisa"}</td>
                          <td>${asset.buy}</td>
                          <td>${asset.sell}</td>
                        </tr>
                      )}
                </tbody>
              </Table>
          </div>
          <form>
              <Button
                bsStyle="info"
                href="/"
                block
                bsSize="large"
              >Volver a la pantalla de inicio
              </Button>
          </form>
        </div>
      );
    }
  }

export default ListAsset;