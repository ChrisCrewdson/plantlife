import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import PlantRow from "./plant-row.component";
import { RouteComponentProps } from "react-router-dom";

interface Plant {
  name?: string;
  species?: string;
  _id: string;
}

interface State {
  plants: Plant[];
}

type Props = RouteComponentProps<{}>;

export default class PlantList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      plants: []
    };
  }

  componentDidMount() {
    axios
      .get("http://192.168.1.42:4000/plants/")
      .then(res => {
        this.setState({
          plants: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.plants.map((res, i) => {
      return <PlantRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Species</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
