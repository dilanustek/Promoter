import React, { Component } from "react";
import "./App.css";
import NPSEntry from "./NPSHelpers";
import FileUploader from "./FileUploader";
import NPSstats from "./NPSstats";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import CssBaseline from "@material-ui/core/CssBaseline";

interface State {
  allNPS: NPSEntry[] | null;
}

class App extends Component<{}, State> {
  state: State = {
    allNPS: null,
  };

  dataHandler = (allNPS: NPSEntry[]) => {
    this.setState({ allNPS: allNPS });
  };

  render() {
    return (
      <div>
        {/* <CssBaseline />
      <Router>
        <Switch>
          <Route path="/home" render={() => <FileUploader />}></Route>
        </Switch>
      </Router> */}
        <FileUploader dataHandler={this.dataHandler} />
        <NPSstats allNPS={this.state.allNPS} />
      </div>
    );
  }
}

export default App;
