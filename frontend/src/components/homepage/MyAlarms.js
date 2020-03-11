import React from 'react';
import { Button } from "react-bootstrap";
import "./MyAlarms.css";

export default function MyAlarms(props) {
    return (
      <div className="body">
      <h1 align="center">¡Mis alarmas!</h1>
        <form>
            <div className="main-div">
              <Button
                bsStyle="info"
                href="/alarms/list"
                block
                bsSize="large"
              >Lista de alarmas
              </Button>
              <Button
                bsStyle="info"
                href="/alarms"
                block
                bsSize="large"
              >Configurar alarmas
              </Button>
            </div>
        </form>
      </div>
    );
}
