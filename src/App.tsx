import React, { Component } from "react";
import "./App.css";
import { NPSEntry } from "./NPSHelpers";
import FileUploaderDialog from "./FileUploaderDialog";
import NPSstats from "./NPSstats";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BackupIcon from "@material-ui/icons/Backup";

interface State {
  allNPS: NPSEntry[] | null;
  isUploadOpen: boolean;
}

class App extends Component<{}, State> {
  state: State = {
    allNPS: null,
    isUploadOpen: true,
  };

  setAllNPSData = (allNPS: NPSEntry[]) => {
    this.setState({ allNPS: allNPS, isUploadOpen: false });
  };

  onUploadClick = () => {
    this.setState({ isUploadOpen: true });
  };

  render() {
    return (
      <section className="app">
        <AppBar position="absolute">
          <Toolbar>
            <IconButton edge="start" color="inherit">
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
            <IconButton color="inherit" onClick={this.onUploadClick}>
              <BackupIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="page">
          <FileUploaderDialog
            dataHandler={this.setAllNPSData}
            isUploadOpen={this.state.isUploadOpen}
          />
          {this.state.allNPS ? <NPSstats allNPS={this.state.allNPS} /> : null}
        </div>
      </section>
    );
  }
}

export default App;
