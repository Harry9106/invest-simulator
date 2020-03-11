import React from 'react';
import { Button } from "react-bootstrap";
import "./AssetStore.css";

export default function AssetStore(props) {
    return (
      <div className="body">
      <h1 align="center">¡Tienda de Activos!</h1>
        <form>
            <div className="main-div">
              <Button
                bsStyle="info"
                href="/asset"
                block
                bsSize="large"
              >Ver cotizaciones de activos
              </Button>
              <Button
                bsStyle="info"
                href="/buy"
                block
                bsSize="large"
              >Comprar Activos
              </Button>
              <Button
                bsStyle="info"
                href="/sellassets"
                block
                bsSize="large"
              >Vender activos
              </Button>
            </div>
        </form>
      </div>
    );
}
