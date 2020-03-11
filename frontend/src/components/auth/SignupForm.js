import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./SignupForm.css"
import Select from 'react-select'


const options = [
  { value: 'a', label: '1-Sad' },
  { value: 'ab', label: '2-Afro' },
  { value: 'abc', label: '3-Asian' },
  { value: 'abcd', label: '4-Red' },
  { value: 'abcde', label: '5-No-Hair' },
  { value: 'abcdef', label: '6-Ninja' },
  { value: 'abcdefg', label: '7-Sunglasses' },
  { value: 'abcdefgh', label: '8-HatMan' }
];
// presentational component, only a stateless function
// gets props by destructuring the props object
// note that the input fields use the props to render their value attribute
const SignupForm = ({username, email,email2, password1, password2,name,last_name,avatar,handleChangeAvatar, handleChangeUsername, handleChangeEmail,handleChangeEmail2, handleChangePassword,handleChangePassword2,handleChangeName,handleChangelast_name, handleSubmit, validate}) => {
    return (
      <div className="SignupForm">
        <h1 align="center">Registro de usuario</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Usuario</ControlLabel>
            <FormControl
              autoFocus
              value={username}
              onChange={handleChangeUsername}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Correo electronico</ControlLabel>
            <FormControl
              value={email}
              onChange={handleChangeEmail}
              type="email"
            />
          </FormGroup>
					<FormGroup controlId="email2" bsSize="large">
            <ControlLabel>Reingresar correo electronico</ControlLabel>
            <FormControl
              value={email2}
              onChange={handleChangeEmail2}
              type="email"
            />
          </FormGroup>
          <FormGroup controlId="password1" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={password1}
              onChange={handleChangePassword}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" bsSize="large">
            <ControlLabel>Reingresar Password</ControlLabel>
            <FormControl
              value={password2}
              onChange={handleChangePassword2}
              type="password"
            />
          </FormGroup>
					<FormGroup controlId="name" bsSize="large">
            <ControlLabel>Nombre</ControlLabel>
            <FormControl
              value={name}
              onChange={handleChangeName}
              type="name"
            />
          </FormGroup>
			<FormGroup controlId="last_name" bsSize="large">
            <ControlLabel>Apellido</ControlLabel>
            <FormControl
              value={last_name}
              onChange={handleChangelast_name}
              type="last_name"
            />
          </FormGroup>
          <FormGroup>
              <ControlLabel>Avatar</ControlLabel>
              <Select
                value={avatar}
                onChange={handleChangeAvatar}
                options={options}
              />
              <img src='/media/a.png' alt="a" title="1" weight="50" width="50"></img>
              <img src='/media/ab.png' alt="ab" title="2" weight="50" width="50"></img>
              <img src='/media/abc.png' alt="abc" title="3" weight="50" width="50"></img>
              <img src='/media/abcd.png' alt="abcd" title="4" weight="50" width="50"></img>
              <img src='/media/abcde.png' alt="abcde" title="5" weight="50" width="50"></img>
              <img src='/media/abcdef.png' alt="abcdef" title="6" weight="50" width="50"></img>
              <img src='/media/abcdefg.png' alt="abcdefg" title="7" weight="50" width="50"></img>
              <img src='/media/abcdefgh.png' alt="abcdefgh" title="8" weight="50" width="50"></img>
          </FormGroup>
          <Button
            block
            bsStyle="success"
            bsSize="large"
            disabled={!validate(username, email,email2, password1, password2,
						name,last_name,avatar)}
            type="submit"
          >
            Signup
          </Button>
        </form>
      </div>
    );
  }

export default SignupForm;
