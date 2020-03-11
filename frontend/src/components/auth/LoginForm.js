import React from 'react';
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./LoginForm.css"
import LoaderButton from "./LoaderButton";

// presentational component, only a stateless function
// gets props by destructuring the props object
// note that the input fields use the props to render their value attribute
const LoginForm = ({username, password, handleChangeUsername, handleChangePassword, handleSubmit, validate, isLoading}) => {
    return (
      <div className="Login">
        <h1 align="center">Iniciar Sesion</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              value={username}
              onChange={handleChangeUsername}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            bsStyle="success"
            disabled={!validate(username, password)}
            type="submit"
            isLoading={isLoading}
            text="Iniciar Sesion"
            loadingText="Iniciando sesion..."
          >
            Login
          </LoaderButton>
        </form>
      </div>
    );
  }

export default LoginForm;
