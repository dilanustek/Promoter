import React, { Component } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import { NPSEntry } from "./NPSHelpers";
import "./CustomerComments.css";

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

  getCommentWithButton() {
    if (this.props.entry.comment.length > this.maxCommentLen) {
      if (this.state.showLong) {
        return (
          <ListItemText>
            {this.props.entry.comment}
            <span className="expand" onClick={this.handleExpandClick}>
              Show less
            </span>
          </ListItemText>
        );
      } else {
        return (
          <ListItemText>
            {this.props.entry.comment.slice(0, this.maxCommentLen)}...
            <span className="expand" onClick={this.handleExpandClick}>
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
        {/* <ListItemText>{this.getText()}</ListItemText> */}
        {/* <ListItemSecondaryAction>
          {this.getExpandIcon()}
        </ListItemSecondaryAction> */}
      </ListItem>
    );
  }
}

export default CommentListItem;
