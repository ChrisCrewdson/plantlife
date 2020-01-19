import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

interface State {
  name?: string;
  species?: string;
  _id: string;
}

interface Props {
  obj: State;
}

export default class PlantRow extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.deletePlant = this.deletePlant.bind(this);
  }

  deletePlant() {
    axios
      .delete(
        "http://192.168.1.42:4000/plants/delete-plant/" + this.props.obj._id
      )
      .then(res => {
        console.log("Plant successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.species}</td>
        <td>
          <Link
            className="edit-link btn"
            to={"/edit-plant/" + this.props.obj._id}
          >
            Edit
          </Link>
          <Button size="sm" variant="danger" onClick={this.deletePlant}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
