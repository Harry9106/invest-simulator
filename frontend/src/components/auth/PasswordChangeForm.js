import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./PasswordChangeForm.css"

// presentational component, only a stateless function
// gets props by destructuring the props object
// note that the input fields use the props to render their value attribute
const PasswordChangeForm = ({old_password, new_password1, new_password2, handleChangePassword, handleSubmit}) => {
    return (
      <div className="PasswordChange">
        <h1 align="center">Cambiar password</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="old_password" bsSize="large">
            <ControlLabel>Password actual</ControlLabel>
            <FormControl
              autoFocus
              value={old_password}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="new_password1" bsSize="large">
            <ControlLabel>Password nueva</ControlLabel>
            <FormControl
              value={new_password1}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="new_password2" bsSize="large">
            <ControlLabel>Repetir password nueva</ControlLabel>
            <FormControl
              value={new_password2}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsStyle="success"
            bsSize="large"
            //disabled={!validate(old_password, new_password1, new_password2)}
            type="submit"
          >
            Aplicar
          </Button>
        </form>
      </div>
    );
  }

export default PasswordChangeForm;