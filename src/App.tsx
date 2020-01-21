import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import CreatePlant from "./components/create-plant.component";
import EditPlant from "./components/edit-plant.component";
import ListPlant from "./components/list-plant.component";
import ViewPlant from "./components/view-plant.component";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/list-plant"} className="nav-link">
                  PlantLife
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-plant"} className="nav-link">
                    Create Plant
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/list-plant"} className="nav-link">
                    List Plants
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={CreatePlant} />
                  <Route path="/create-plant" component={CreatePlant} />
                  <Route path="/edit-plant/:id" component={EditPlant} />
                  <Route path="/view-plant/:id" component={ViewPlant} />
                  <Route path="/list-plant" component={ListPlant} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
