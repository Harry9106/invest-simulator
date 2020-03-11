import React from 'react';
import { Button } from "react-bootstrap";
import "./Home.css";

export default function Home(props) {
    return (
      <div className="body">
      <h1 align="center">¡Bienvenido {props.username}!</h1>
        <form>
            <div className="main-div">
              <Button
                bsStyle="info"
                href="/myprofile"
                block
                bsSize="large"
              >Mi perfil
              </Button>
              <Button
                bsStyle="info"
                href="/wallet"
                block
                bsSize="large"
              >Cartera de inversiones
              </Button>
              <Button
                bsStyle="info"
                href="/assetstore"
                block
                bsSize="large"
              >Tienda de activos
              </Button>
              <Button
                bsStyle="info"
                href="/history"
                block
                bsSize="large"
              >Ver historial
              </Button>
              <Button
                    bsStyle="info"
                    href="/ranking"
                    block
                    bsSize="large"
              >Ranking de usuarios
              </Button>
              <Button
                bsStyle="info"
                href="/myalarms"
                block
                bsSize="large"
              >Mis alarmas
              </Button>
              <Button
                bsStyle="info"
                href="/publics"
                block
                bsSize="large"
              >Inversiones Publicas
              </Button>
            </div>
        </form>
      </div>
    );
}
