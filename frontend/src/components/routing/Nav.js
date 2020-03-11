import React, {Fragment} from 'react';
import {Navbar, Nav, NavItem,Image} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Nav.css"



// lots of Bootstrap code here
// Notice the use of <Fragment> to avoid adding useless <div>s
import "./Nav.css";

const NavBar = ({isAuthenticated, username, avatar, cash, rank, handleLogout}) => {
  return (
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
            {isAuthenticated
            ? <Image src={'/media/'+avatar+'.png'}  weight="80" width="80"></Image>

            : ''
            }
          {isAuthenticated
            ? <Link to="/" content="margin-right:5px">{username}</Link>

            : 'InvestSimulator'
          }
          {isAuthenticated
            ? <dev class="rank-money">
                <LinkContainer to="/ranking">
                  <NavItem>{"Ranking: "+rank}</NavItem>
                </LinkContainer>
                <LinkContainer to="/">
                  <NavItem>{"Dinero liquido: $"+cash}</NavItem>
                </LinkContainer>
              </dev>

            : ''
          }
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </Fragment>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;