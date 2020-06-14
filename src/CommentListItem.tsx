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

const MAX_COMMENT_LENGTH = 330;

class CommentListItem extends Component<Props, State> {
  state: State = {
    showLong: false,
  };

  onExpandClick = () => {
    this.setState({
      showLong: !this.state.showLong,
    });
  };

  getComment() {
    if (this.isCommentTooLong() && !this.state.showLong) {
      return this.props.entry.comment.slice(0, MAX_COMMENT_LENGTH) + "...";
    } else {
      return this.props.entry.comment;
    }
  }

  getExpandButton() {
    return (
      <span className="expand" onClick={this.onExpandClick}>
        {this.state.showLong ? "Show less" : "Show more"}
      </span>
    );
  }

  isCommentTooLong() {
    return this.props.entry.comment.length > MAX_COMMENT_LENGTH;
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          {this.getComment()}
          {this.isCommentTooLong() ? this.getExpandButton() : null}
        </ListItemText>
      </ListItem>
    );
  }
}

export default CommentListItem;
