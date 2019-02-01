import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import AddScore from "./AddScore";
import { ApiAddress } from "../constants/constants";
import EditScore from "./EditScore";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class ScoreTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoreData: []
    };
  }

  componentDidMount() {
    this.loadScores();
  }

  loadScores = () => {
    fetch(ApiAddress)
      .then(res => res.json())
      .then(resData => {
        this.setState({ scoreData: resData });
      })
      .catch(err => console.log(err));
  };

  addScore = score => {
    fetch(ApiAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(score)
    })
      .then(() => {
        toast.success("Score added", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.loadScores();
      })
      .catch(err => {
        toast.error("Error when adding score", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.log(err);
      });
  };

  updateScore = (id, score) => {
    fetch(ApiAddress + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(score)
    })
      .then(() => {
        toast.success("Score updated", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.loadScores();
      })
      .catch(err => {
        toast.error("Error when updating score", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.log(err);
      });
  };

  confirmDelete = (row, id) => {
    confirmAlert({
      message: `Are you sure you want to delete ${row.name} with a score of ${
        row.score
      }?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteScore(id)
        },
        {
          label: "No"
        }
      ]
    });
  };

  deleteScore = id => {
    fetch(ApiAddress + "/" + id, {
      method: "DELETE"
    })
      .then(() => {
        toast.success("Score deleted", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        this.loadScores();
      })
      .catch(err => {
        toast.error("Error when deleting score", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err);
      });
  };

  render() {
    const data = this.state.scoreData;
    const columns = [
      {
        Header: "Name",
        accessor: "name",
        filterable: true,
        sortable: true
      },
      {
        Header: "Score",
        accessor: "score",
        filterable: true,
        sortable: true
      },
      {
        Header: "Edit",
        accessor: "_id",
        filterable: false,
        sortable: false,
        Cell: ({ row, value }) => (
          <EditScore updateScore={this.updateScore} id={value} score={row} />
        )
      },
      {
        Header: "Delete",
        accessor: "_id",
        filterable: false,
        sortable: false,
        Cell: ({ row, value }) => (
          <Button
            size="small"
            variant="text"
            color="secondary"
            onClick={() => {
              this.confirmDelete(row, value);
            }}
          >
            Delete
          </Button>
        )
      }
    ];

    return (
      <div>
        <ReactTable
          data={data}
          columns={columns}
          minRows={1}
          className="-striped -highlight"
        />
        <AddScore addScore={this.addScore} />
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
