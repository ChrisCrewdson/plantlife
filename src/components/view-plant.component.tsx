import React, { Component } from "react";
import axios from "axios";
import { RouteComponentProps, Link } from "react-router-dom";
import QRCode from "qrcode.react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

type Props = RouteComponentProps<{ id?: string }>;
interface State {
  name?: string;
  species?: string;
}

export default class ViewPlant extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // State
    this.state = {
      name: "",
      species: ""
    };
  }

  deletePlant() {
    axios
      .delete(
        `${process.env.REACT_APP_API_URI}/plants/delete-plant/${this.props.match.params.id}`
      )
      .then(() => {
        console.log("Plant successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });
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

  render() {
    return (
      <Table striped bordered hover>
        <tbody>
          <tr className="qr-wrapper">
            <td colSpan={2}>
              <QRCode
                value={`${process.env.REACT_APP_URI}/view-plant/${this.props.match.params.id}`}
              />
            </td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{this.state.name}</td>
          </tr>
          <tr>
            <td>Species</td>
            <td>{this.state.species}</td>
          </tr>

          <tr>
            <td>
              <Link
                className="edit-link btn"
                to={"/edit-plant/" + this.props.match.params.id}
              >
                Edit
              </Link>
              <Button size="sm" variant="danger" onClick={this.deletePlant}>
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
}
