import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems } from "./ListItems";
import "./FileUploader.css";

interface State {
  isFileUploaded: boolean;
  isDrawerOpen: boolean;
}

class FileUploader extends Component<{}, State> {
  state: State = {
    isFileUploaded: false,
    isDrawerOpen: false,
  };

  uploadHandler = () => {
    console.log("uploading file...");
  };

  handleDrawerToggle = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  getIsDrawerOpen() {
    if (this.state.isDrawerOpen) {
      return "openDrawer";
    } else return "closeDrawer";
  }

  render() {
    return (
      <section className="uploadFile">
        <AppBar position="absolute">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          className={this.getIsDrawerOpen()}
          variant="permanent"
          open={this.state.isDrawerOpen}
        >
          <div>
            <IconButton onClick={this.handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <header>
          <h1>Promoter Analysis</h1>
        </header>
        <section>
          <p>
            Upload a csv of your NPS data. It should have the NPS scare in the
            first column, the NPS comments in the second column, and have tags
            in the other columns.
          </p>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUploadIcon />}
            onClick={this.uploadHandler}
          >
            Analyze
          </Button>
        </section>
      </section>
    );
  }
}

export default FileUploader;
