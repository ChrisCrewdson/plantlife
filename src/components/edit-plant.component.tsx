import React, { Component, ChangeEvent, FormEvent } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{ id?: string }>;
interface State {
  name?: string;
  species?: string;
}

export default class EditPlant extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChangePlantName = this.onChangePlantName.bind(this);
    this.onChangePlantSpecies = this.onChangePlantSpecies.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: "",
      species: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/plants/view-plant/${this.props.match.params.id}`
      )
      .then(res => {
        this.setState({
          name: res.data.name,
          species: res.data.species
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangePlantName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value });
  }

  onChangePlantSpecies(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ species: e.target.value });
  }

  onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const plantObject = {
      name: this.state.name,
      species: this.state.species
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URI}/plants/update-plant/${this.props.match.params.id}`,
        plantObject
      )
      .then(() => {
        console.log("Plant successfully updated");
      })
      .catch(error => {
        console.log(error);
      });

    // Redirect to Plant List
    this.props.history.push("/list-plant");
  }

  render() {
    return (
      <div className="form-wrapper">
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
            Update Plant
          </Button>
        </Form>
      </div>
    );
  }
}
