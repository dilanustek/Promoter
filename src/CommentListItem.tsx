import React, { Component } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { NPSEntry } from "./NPSHelpers";

import {
  ListItemText,
  ListItemIcon,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";

interface Props {
  entry: NPSEntry;
}

interface State {
  showLong: boolean;
}

class CommentListItem extends Component<Props, State> {
  state: State = {
    showLong: false,
  };
  maxCommentLen = 330;

  handleExpandClick = () => {
    this.setState({
      showLong: !this.state.showLong,
    });
  };

  getExpandIcon() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      if (this.state.showLong) {
        return <ExpandLess onClick={this.handleExpandClick} />;
      } else {
        return <ExpandMore onClick={this.handleExpandClick} />;
      }
    } else return null;
  }

  getText() {
    if (
      this.props.entry.comment.length > this.maxCommentLen &&
      !this.state.showLong
    ) {
      return this.props.entry.comment.slice(0, this.maxCommentLen);
    } else {
      return this.props.entry.comment;
    }
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        <ListItemText>{this.getText()}</ListItemText>
        <ListItemSecondaryAction>
          {this.getExpandIcon()}
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default CommentListItem;
