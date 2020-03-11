import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./EditProfileForm.css";
import ImgAvatar from "../info/ImgAvatar";

// presentational component, only a stateless function
// gets props by destructuring the props object
// note that the input fields use the props to render their value attribute
const EditProfileForm = ({email, first_name, last_name, avatar, handleChangeAvatar, handleChangeEmail, handleChangeName, handleChangelast_name, handleSubmit, validate}) => {
    return (
      <div className="Profile">
        <h1 align="center">Modificar Perfil de usuario</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              value={email}
              onChange={handleChangeEmail}
              type="email"
            />
          </FormGroup>
		  <FormGroup controlId="first_name" bsSize="large">
            <ControlLabel>Nombre</ControlLabel>
            <FormControl
              value={first_name}
              onChange={handleChangeName}
            />
          </FormGroup>
			<FormGroup controlId="last_name" bsSize="large">
            <ControlLabel>Apellido</ControlLabel>
            <FormControl
              value={last_name}
              onChange={handleChangelast_name}
            />
            </FormGroup>

            <ImgAvatar
                avatar={avatar}
                handleChangeAvatar={handleChangeAvatar}
                />

          <Button
            block
            bsStyle="success"
            bsSize="large"
            disabled={!validate(email, first_name, last_name, avatar)}
            type="submit"
          >
            Modificar
          </Button>
        </form>
      </div>
    );
  }

export default EditProfileForm;
