import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileUploader from "./FileUploader";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  return (
    <div>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/home" render={() => <FileUploader />}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
