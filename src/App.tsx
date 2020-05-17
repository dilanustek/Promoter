import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FileUploader from "./FileUploader";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" render={() => <FileUploader />}></Route>
      </Switch>
    </Router>
  );
}

export default App;
