import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import SkyLight from "react-skylight";
import Button from "@material-ui/core/Button";

export default class AddScore extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      score: "",
      invalidName: false,
      invalidScore: false
    };
  }

  handleChange = event => {
    if (event.target.name === "name") {
      this.setState({
        invalidName: true
      });
    } else if (event.target.name === "score") {
      this.setState({
        invalidScore: true
      });
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const score = {
      name: this.state.name,
      score: this.state.score
    };

    this.props.addScore(score);
    this.simpleDialog.hide();
    this.setState({
      name: "",
      score: ""
    });
  };

  cancelSubmit = event => {
    event.preventDefault();
    this.setState({
      name: "",
      score: ""
    });
    this.simpleDialog.hide();
  };

  render() {
    const buttonToggle = () => {
      if (this.state.name === "" || !this.state.score) {
        return (
          <Button
            disabled
            variant="outlined"
            color="primary"
            style={{ marginRight: 10 }}
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        );
      } else {
        return (
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: 10 }}
            onClick={this.handleSubmit}
          >
            Save
          </Button>
        );
      }
    };
    return (
      <div>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="New Score"
        >
          <form id="scoreForm">
            <TextField
              error={this.state.name === "" && this.state.invalidName}
              helperText="Please enter a valid name."
              label="name"
              placeholder="Name"
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              error={!this.state.score && this.state.invalidScore}
              helperText="Please enter a valid score."
              label="score"
              placeholder="Score"
              type="number"
              className="form-control"
              name="score"
              value={this.state.score}
              onChange={this.handleChange}
            />
            <div style={{ margin: 10 }}>
              {buttonToggle()}
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.cancelSubmit}
              >
                Cancel
              </Button>
            </div>
          </form>
        </SkyLight>
        <div>
          <Button
            style={{ margin: "10px" }}
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({
                invalidName: false,
                invalidScore: false
              });
              this.simpleDialog.show();
            }}
          >
            New Score
          </Button>
        </div>
      </div>
    );
  }
}
