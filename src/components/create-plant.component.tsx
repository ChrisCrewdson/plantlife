import React, { Component, ChangeEvent, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{}>;
interface State {
  name?: string;
  species?: string;
}

export default class CreatePlant extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Setting up functions
    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: "",
      species: ""
    };
  }

  onChangePlantName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value || "" });
  }

  onChangePlantSpecies(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ species: e.target.value || "" });
  }

  async onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const plantObject = {
      name: this.state.name,
      species: this.state.species
    };
    await axios
      .post("http://192.168.1.42:4000/plants/create-plant", plantObject)
      .then(res => {
        console.log(`Plant successfully created!`);
        console.log(`Name: ${this.state.name}`);
        console.log(`Species: ${this.state.species}`);

        console.log("Plant successfully created", res.data);
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({ name: "", species: "" });

    // Redirect to Plant List
    this.props.history.push("/list-plant");
  }

  render() {
    return (
      <div data-class="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangePlantName}
            />
          </Form.Group>

          <Form.Group controlId="Species">
            <Form.Label>Species</Form.Label>
            <Form.Control
              type="text"
              value={this.state.species}
              onChange={this.onChangePlantSpecies}
            />
          </Form.Group>

          <Button variant="danger" size="lg" data-block="block" type="submit">
            Create Plant
          </Button>
        </Form>
      </div>
    );
  }
}
