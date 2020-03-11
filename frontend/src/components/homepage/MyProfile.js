import React from 'react';
import { Button } from "react-bootstrap";
import "./MyProfile.css";

export default function MyProfile(props) {
    return (
      <div className="body">
      <h1 align="center">¡Mi perfil!</h1>
        <form>
            <div className="main-div">
              <Button
                bsStyle="info"
                href="/profile"
                block
                bsSize="large"
              >Modificar perfil
              </Button>
              <Button
                bsStyle="info"
                href="/passwordchange"
                block
                bsSize="large"
              >Cambiar contraseña
              </Button>
            </div>
        </form>
      </div>
    );
}
