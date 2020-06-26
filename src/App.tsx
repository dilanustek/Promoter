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
import CircularProgress from "@material-ui/core/CircularProgress";
import { styled } from "@material-ui/core/styles";

interface State {
  allNPS: NPSEntry[] | null;
  isUploadModalOpen: boolean;
  isLoading: boolean;
}

const MyLoader = styled(CircularProgress)(({ theme }) => ({
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: "auto",
  width: "60px",
  height: "60px",
}));

class App extends Component<{}, State> {
  state: State = {
    allNPS: null,
    isUploadModalOpen: true,
    isLoading: false,
  };

  setAllNPSData = (allNPS: NPSEntry[]) => {
    this.setState({ allNPS: null, isUploadModalOpen: false, isLoading: true });

    window.setTimeout(
      (allNPS: NPSEntry[]) => {
        console.log("hello");
        this.setState({
          allNPS: allNPS,
          isLoading: false,
        });
      },
      2 * 1000,
      allNPS
    );
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
          {this.state.isLoading ? (
            <div className="loading">
              <MyLoader />
            </div>
          ) : null}
          <FeedbackButton />
        </div>
      </section>
    );
  }
}

export default App;
