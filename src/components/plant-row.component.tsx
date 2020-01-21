import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import QRCode from "qrcode.react";

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
      .delete("http://localhost:4000/plants/delete-plant/" + this.props.obj._id)
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
        <td>
          <QRCode value={this.props.obj._id} />
        </td>
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
