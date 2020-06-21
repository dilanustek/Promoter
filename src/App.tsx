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
import FeedbackButton from "./FeedbackButton";

interface State {
  allNPS: NPSEntry[] | null;
  isUploadModalOpen: boolean;
}

class App extends Component<{}, State> {
  state: State = {
    allNPS: null,
    isUploadModalOpen: true,
  };

  setAllNPSData = (allNPS: NPSEntry[]) => {
    this.setState({ allNPS: allNPS, isUploadModalOpen: false });
  };

  onUploadClick = () => {
    this.setState({ isUploadModalOpen: true });
  };

  setIsUploadModal = (isOpen: boolean) => {
    this.setState({ isUploadModalOpen: isOpen });
  };

  render() {
    return (
      <section className="app">
        <AppBar position="fixed">
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
              Net-Promoter
            </Typography>
            <IconButton color="inherit" onClick={this.onUploadClick}>
              <BackupIcon style={{ fontSize: 30 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="page">
          <FileUploaderDialog
            setAllNPSData={this.setAllNPSData}
            isUploadModalOpen={this.state.isUploadModalOpen}
            isAllNPSSet={this.state.allNPS ? true : false}
            setIsUploadModal={this.setIsUploadModal}
          />
          {this.state.allNPS ? <NPSstats allNPS={this.state.allNPS} /> : null}
          <FeedbackButton />
        </div>
      </section>
    );
  }
}

export default App;
