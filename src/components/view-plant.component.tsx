import React, { Component } from "react";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import QRCode from "qrcode.react";

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

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/plants/view-plant/" + this.props.match.params.id
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
      <div className="form-wrapper">
        <div className="qr-wrapper">
          <QRCode value={this.props.match.params.id || ""} />
        </div>
        <div>Name: {this.state.name}</div>

        <div>Species: {this.state.species}</div>
      </div>
    );
  }
}
