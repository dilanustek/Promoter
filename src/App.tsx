import React, { Component } from "react";
import "./App.css";
import { NPSEntry } from "./NPSHelpers";
import FileUploader from "./FileUploader";
import NPSstats from "./NPSstats";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import BackupIcon from "@material-ui/icons/Backup";

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
      <section className="app">
        <AppBar position="absolute">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Typography
              className="appbar-title"
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <BackupIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="page">
          <FileUploader dataHandler={this.dataHandler} />
          <NPSstats allNPS={this.state.allNPS} />
        </div>
      </section>
    );
  }
}

export default App;
