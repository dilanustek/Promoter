import React, { Component } from "react";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { NPSEntry } from "./NPSHelpers";
import "./CustomerComments.css";

import { ListItemText, ListItemIcon, ListItem } from "@material-ui/core";

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

  onExpandClick = () => {
    this.setState({
      showLong: !this.state.showLong,
    });
  };

  getComment() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      if (this.state.showLong) {
        return this.props.entry.comment;
      } else {
        return this.props.entry.comment.slice(0, this.maxCommentLen) + "...";
      }
    } else {
      return this.props.entry.comment;
    }
  }

  getExpandButton() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      if (this.state.showLong) {
        return (
          <span className="expand" onClick={this.onExpandClick}>
            Show less
          </span>
        );
      } else {
        return (
          <span className="expand" onClick={this.onExpandClick}>
            Show more
          </span>
        );
      }
    }
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          {this.getComment()} {this.getExpandButton()}
        </ListItemText>
      </ListItem>
    );
  }
}

export default CommentListItem;
