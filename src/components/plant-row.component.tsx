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
        `${process.env.REACT_APP_API_URI}/plants/delete-plant/${this.props.obj._id}`
      )
      .then(() => {
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
            className="view-link btn"
            to={"/view-plant/" + this.props.obj._id}
          >
            View
          </Link>
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
