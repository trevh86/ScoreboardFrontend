import React, { Component } from "react";
import "./App.css";
import ScoreTable from "./components/ScoreTable";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar>
          <Toolbar>Trev's Scoreboard!</Toolbar>
        </AppBar>
        <div style={{ margin: 100 }}>
          <ScoreTable />
        </div>
      </div>
    );
  }
}

export default App;
