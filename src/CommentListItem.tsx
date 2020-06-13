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

  getCommentWithButton() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      if (this.state.showLong) {
        return (
          <ListItemText>
            {this.props.entry.comment}
            <span className="expand" onClick={this.onExpandClick}>
              Show less
            </span>
          </ListItemText>
        );
      } else {
        return (
          <ListItemText>
            {this.props.entry.comment.slice(0, this.maxCommentLen)}...
            <span className="expand" onClick={this.onExpandClick}>
              Show more
            </span>
          </ListItemText>
        );
      }
    } else {
      return <ListItemText>{this.props.entry.comment}</ListItemText>;
    }
  }

  render() {
    return (
      <ListItem>
        <ListItemIcon>
          <ChatOutlinedIcon />
        </ListItemIcon>
        {this.getCommentWithButton()}
      </ListItem>
    );
  }
}

export default CommentListItem;
