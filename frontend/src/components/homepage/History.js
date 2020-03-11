import React from 'react';
import { Button } from "react-bootstrap";
import "./History.css";

export default function History(props) {
    return (
      <div className="body">
      <h1 align="center">¡Historial!</h1>
        <form>
            <div className="main-div">
              <Button
                bsStyle="info"
                href="/transactionhistorial"
                block
                bsSize="large"
              >Ver historial de transacciones</Button>
              <Button
                bsStyle="info"
                href="/assethistory"
                block
                bsSize="large"
              >Ver historial de activos
              </Button>
            </div>
        </form>
      </div>
    );
}
